module core {
	/**
     * Controller基类
     * 除release()外都为底层自动调用
     */
    export abstract class Controller extends egret.HashObject {
        /**
         * 进入Controller传入数据
         */
        protected p_data: any;
        /**
         * 当前模块
         */
        protected p_ControllerName: number;
        /**
         * loadingUI
         */
        protected p_loadingUI: ILoadingUI;
        /**
         * 是否已打开
         */
        private m_isOpened: boolean = false;
        /**
         * 是否加载完成
         */
        protected p_isLoaded: boolean = false;

        public constructor(controllerName: number) {
            super();
            this.p_ControllerName = controllerName;
            this.init();
        }
        /**
         * 初始化
         */
        protected init(): void {
            core.EventManager.getInstance().addEventListener(core.EventID.CONTROLLER_SHOW, this.onControllerShow, this);
            core.EventManager.getInstance().addEventListener(core.EventID.CONTROLLER_HIDE, this.onControllerHide, this);
        }
        /**
         * 预加载
         */
        private preload(): void {
            let groups: string[] = this.getLoadGroup(this.p_data);
            if (groups && groups.length > 0) {
                this.p_loadingUI = this.getLoading();
                if (this.p_loadingUI) {
                    this.p_loadingUI.show();
                }
                core.ResUtils.loadGroups(groups, this.onLoadProgress, this.onLoadFaild, this.onLoadComplete, this);
            } else {
                this.show(this.p_data);
                this.p_data = null;
            }
        }
        /**
         *  加载前
         */
        private onControllerShow(data: ControllerEventData): void {
            if (this.p_ControllerName === data.controllerEnum) {
                if (!this.m_isOpened) {
                    this.p_data = data.messageData;
                    this.p_isLoaded = false;
                    this.m_isOpened = true;
                    this.preload();
                } else if (this.p_isLoaded) {
                    this.update(data.messageData);
                }
            }
        }
        /**
         * 关闭前
         */
        private onControllerHide(data: ControllerEventData): void {
            if (this.p_ControllerName === data.controllerEnum && this.m_isOpened) {
                this.m_isOpened = false;
                this.hide();
            }
        }
        /**
         * 加载进度
         */
        private onLoadProgress(data: core.GroupData): void {
            if (this.p_loadingUI) {
                this.p_loadingUI.setProgress(data);
            }
        }
        /**
         * 加载失败
         */
        private onLoadFaild(data: core.GroupData): void {
            if (data.curResItem) {
                Log.log(`失败URL：${data.curResItem.url}`);
            }
        }
        /**
         * 加载完成
         */
        private onLoadComplete(data: core.GroupData): void {
            Log.log(">>>" + data.curGroup);
            this.p_isLoaded = true;
            if (this.p_loadingUI) {
                this.p_loadingUI.hide();
                this.p_loadingUI = null;
            }
            if (this.m_isOpened) {
                core.EventManager.getInstance().sendEvent(new core.ControllerEventData(core.EventID.CONTROLLER_LOADED, this.p_ControllerName));
                this.show(this.p_data);
                this.p_data = null;
            }
        }
        /**
         * 预加载资源组
         */
        protected abstract getLoadGroup(data?: any): string[];
        /**
         * 获取loading
         */
        protected getLoading(): core.ILoadingUI {
            return null;
        }
        /**
         * 显示
         */
        protected abstract show(data?: any): void;
        /**
         * 隐藏
         */
        protected abstract hide(): void;
        /**
         * 更新
         */
        protected update(data?: any): void { }
        /**
         * 模块是否开启
         */
        protected IsOpen(): boolean {
            return this.m_isOpened;
        }
        /**
         * 释放资源
         */
        protected release(): void {
            core.EventManager.getInstance().removeEventListener(core.EventID.CONTROLLER_SHOW, this.onControllerShow, this);
            core.EventManager.getInstance().removeEventListener(core.EventID.CONTROLLER_HIDE, this.onControllerHide, this);
        }
    }
}
