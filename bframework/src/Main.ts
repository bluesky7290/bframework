import Log = core.Log;

class Main extends egret.DisplayObjectContainer {
    constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })

        egret.lifecycle.onPause = () => {
            core.EventManager.getInstance().sendEvent(new ttaby.CustomEvent(ttaby.CustomEventID.GAMEPAUSE));
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            core.EventManager.getInstance().sendEvent(new ttaby.CustomEvent(ttaby.CustomEventID.GAMERESUME));
            egret.ticker.resume();
        }

        window["ttaby"] = ttaby;
        window["core"] = core;
        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());

        core.Core.run(this.stage);
        core.LayerCenter.getInstance().addLayer(ttaby.LayerEnum.GAME, new core.Layer(false, false));
        core.LayerCenter.getInstance().addLayer(ttaby.LayerEnum.FISH1, new core.Layer());
        core.LayerCenter.getInstance().addLayer(ttaby.LayerEnum.FISH2, new core.Layer());
        core.LayerCenter.getInstance().addLayer(ttaby.LayerEnum.FISH3, new core.Layer());
        core.LayerCenter.getInstance().addLayer(ttaby.LayerEnum.FISH4, new core.Layer());
        core.LayerCenter.getInstance().addLayer(ttaby.LayerEnum.FISH5, new core.Layer());
        core.LayerCenter.getInstance().addLayer(ttaby.LayerEnum.FISH6, new core.Layer());
        core.LayerCenter.getInstance().addLayer(ttaby.LayerEnum.EFFECT, new core.Layer(false, false));
        core.LayerCenter.getInstance().addLayer(ttaby.LayerEnum.BULLET, new core.EUILayer());
        core.LayerCenter.getInstance().addLayer(ttaby.LayerEnum.UI, new core.EUILayer());
        core.LayerCenter.getInstance().addLayer(ttaby.LayerEnum.UIEFFECT, new core.EUILayer(false, false));
        core.LayerCenter.getInstance().addLayer(ttaby.LayerEnum.POPUP, new core.EUILayer());
        core.LayerCenter.getInstance().addLayer(ttaby.LayerEnum.LOADING, new core.EUILayer());
        core.LayerCenter.getInstance().addLayer(ttaby.LayerEnum.TOP, new core.Layer());

        // 加载资源配置
        this.loadResConfig();
    }

    /**
     * 加载资源配置
     */
    private loadResConfig(): void {
        core.LoadingManager.setCurLoading(ttaby.LoadingUI).show();
        //初始化Resource资源加载库
        if (RELEASE && core.PlatUtils.isWeGame) {
            // core.ResConfigManager.instance.addConfig("https://cdn.h5gamelogin1.haofeigame.com/Buyu/dev/resource/default.res.json", "https://cdn.h5gamelogin1.haofeigame.com/Buyu/dev/resource/");
            // core.ResConfigManager.instance.addConfig("https://cdn.h5gamelogin1.haofeigame.com/Buyu/dev/resource/main.res.json", "https://cdn.h5gamelogin1.haofeigame.com/Buyu/dev/resource/");
            // core.ResConfigManager.instance.addConfig("https://cdn.h5gamelogin1.haofeigame.com/Buyu/dev/resource/sprite.res.json", "https://cdn.h5gamelogin1.haofeigame.com/Buyu/dev/resource/");
            // core.ResConfigManager.instance.addConfig("https://cdn.h5gamelogin1.haofeigame.com/Buyu/dev/resource/room.res.json", "https://cdn.h5gamelogin1.haofeigame.com/Buyu/dev/resource/");
            // core.ResConfigManager.instance.addConfig("https://cdn.h5gamelogin1.haofeigame.com/Buyu/dev/resource/fishs.res.json", "https://cdn.h5gamelogin1.haofeigame.com/Buyu/dev/resource/");
            // core.ResConfigManager.instance.addConfig("https://cdn.h5gamelogin1.haofeigame.com/Buyu/dev/resource/common.res.json", "https://cdn.h5gamelogin1.haofeigame.com/Buyu/dev/resource/");
        } else {
            core.ResConfigManager.instance.addConfig("resource/default.res.json", "resource/");
        }
        core.ResConfigManager.instance.loadConfig(this.onConfigComplete, this);
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     */
    private onConfigComplete(): void {
        //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
        let theme = new eui.Theme("resource/default.thm.json", this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, () => {
            core.ResUtils.loadGroups(["preload"], this.onResourceProgress, this.onResourceLoadError, this.onResourceLoadComplete, this);
        }, this);
    }

    /**
     * 资源组加载进度
     * @param  {core.GroupData} data
     */
    private onResourceProgress(data: core.GroupData): void {
        Log.log(`当前加载进度:${data.curGroup} ${data.curGroupLoaded}/${data.curGroupTotal}`);
        core.LoadingManager.getLoading(ttaby.LoadingUI).setProgress(data);
    }

    /**
     * 资源组加载出错
     * @param  {core.GroupData} data
     */
    private onResourceLoadError(data: core.GroupData): void {
        //TODO
        Log.log("Group:" + data.curGroup + " has failed to load");
    }
    /**
     * preload资源组加载完成
     * @param  {core.GroupData} data
     */
    private onResourceLoadComplete(data: core.GroupData): void {
        // if (data.curGroup.groupName == 'preload') {
        core.Log.log("Group:" + data.curGroup + " load complete");
        core.LoadingManager.getLoading(ttaby.LoadingUI).hide();
        ttaby.ResManager.loadZip();
        ttaby.GlobalConfig.Init();
        ttaby.Configuration.Init();
        ttaby.Data.Init();
        ttaby.ScreenBound.calRatio(this.stage.stageWidth, this.stage.stageHeight);
        this.initController();
        // ttaby.CommonFunction.OpenUI(ttaby.ControllerEnum.LOGIN);
        core.ResUtils.destoryGroups(["config_zip"]);

        core.TimerManager.instance.addTick(30000, -1, () => {
            if (egret.Capabilities.runtimeType == egret.RuntimeType.WXGAME) {
                wx.triggerGC();
            }
        }, this);

        // diff尽量保持在120以内
        let count = egret.$hashCount;
        setInterval(() => {
            let newCount = egret.$hashCount;
            let diff = newCount - count;
            count = newCount;
            if (diff > 120) {
                Log.error("diff>>>>>", diff);
            }
        }, 1000);
        // core.Log.log(ttaby.Utils.is("Array", ["a","b"]));
        // core.Log.log(ttaby.Utils.is("Array", new Array<any>()));
        // core.Log.log(ttaby.Utils.is("String", "a"));
        // core.Log.log(ttaby.Utils.is("String", new String("a")));
        // core.Log.log(ttaby.Utils.is("String", String("a")));
        // }
    }

    private initController(): void {
        new ttaby.LoginController();
        new ttaby.ShowtipController();
    }
}