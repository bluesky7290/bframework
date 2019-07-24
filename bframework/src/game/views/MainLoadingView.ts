namespace ttaby {
    import Log = core.Log;

    export class MainLoadingView extends BaseView implements core.ILoadingUI {
        public m_bg: eui.Image;
        public m_mask: eui.Rect;
        public m_icon: eui.Image;
        public m_imgtip: eui.Image;
        public m_pProgressGroup: eui.Group;
        public m_loadingIcon: eui.Image;
        public m_progressbar: eui.Image;
        public m_labeldisplay: eui.Label;
        public m_update: eui.Group;
        public m_download: eui.Label;
        public m_descript: eui.Label;
        public m_updateing: eui.Label;
        public m_updated: eui.Label;
        public m_msg: eui.Label;
        public m_labeltip: eui.Label;

        //----------------------------------

        public constructor(owerCtrl: BaseController) {
            super(owerCtrl);
            LayoutManager.fullScreen(this);
            this.skinName = 'resource/skins/LoadingSkin.exml';
        }
        protected childrenCreated(): void {
            super.childrenCreated();
            this.m_labeltip.text = "首次进游戏需加载更多资源，疯狂载入中...";
        }

        public setProgress(progress: core.GroupData): void {
            let percent: number = progress.curGroupLoaded / progress.curGroupTotal;
            // this.m_descript.text = Math.floor(percent * 100 << 0) + "%";
            let rate: number = Math.floor(percent * 100 << 0);
            this.m_progressbar.percentWidth = rate;
            this.m_loadingIcon.x = 794 * rate / 100;
            this.m_labeldisplay.text = rate + "%";
        }

        public show(): void {
            CurScene = SceneType.Loading;
            core.EventManager.getInstance().addEventListener(egret.Event.RESIZE, this.updateAdaptive, this);
            core.LayerCenter.getInstance().getLayer(LayerEnum.LOADING).addChild(this);
            this.updateAdaptive();
            this.changeTipText();
            core.TimerManager.instance.addTick(3000, -1, this.changeTipText, this);
        }

        private changeTipText(): void {
            let content: string = this.GetNextContent();
            this.m_labeltip.text = content;
        }

        public GetNextContent(): any {
            let length: number = 0;
            for (let i in Configuration.loading) {
                length++;
            }
            let index: number = core.MathUtils.randomIntNM(1, length);
            return Configuration.loading[index].note;
        }

        //开始下载
        public StartDownload(): void {
            this.m_update.visible = true;
        }

        //结束下载
        public FinishedDownload(): void {
            this.m_update.visible = false;
        }

        public StartDecompress(): void {
            this.m_update.visible = false;
            this.m_labeltip.text = "正在进行解压（解压时不消耗任何流量）"
        }

        public StartLoadingRes(): void {
            this.m_labeltip.text = "资源加载中...";
        }

        public release() {
        }

        public hide(): void {
            core.TimerManager.instance.removeTick(this.changeTipText, this);
            core.EventManager.getInstance().removeEventListener(egret.Event.RESIZE, this.updateAdaptive, this);
            if (this.parent) {
                this.parent.removeChild(this);
            }
        }

        public updateAdaptive(): void {
            this.m_progressbar.percentWidth = 0;
            this.m_loadingIcon.x = 0;
            this.m_labeldisplay.text = "0/100";
        }
    }
}