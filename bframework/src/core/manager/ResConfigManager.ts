namespace core {
    /**
     * 资源加载工具类，
     * 支持多个resource.json文件加载
     */
    export class ResConfigManager {
        private static s_instance: ResConfigManager;

        private m_configs: Array<any>;
        private m_onConfigComplete: Function;
        private m_onConfigCompleteTarget: any;

        /**
         * 构造函数
         */
        public constructor() {
            this.m_configs = new Array<any>();
        }

        /**
         * 添加一个配置文件
         * @param jsonPath resource.json路径
         * @param filePath 访问资源路径
         */
        public addConfig(jsonPath: string, filePath: string): void {
            this.m_configs.push([jsonPath, filePath]);
        }

        /**
         * 开始加载配置文件
         * @param $onConfigComplete 加载完成执行函数
         * @param $onConfigCompleteTarget 加载完成执行函数所属对象
         */
        public loadConfig(onConfigComplete: Function, onConfigCompleteTarget: any): void {
            this.m_onConfigComplete = onConfigComplete;
            this.m_onConfigCompleteTarget = onConfigCompleteTarget;
            this.loadNextConfig();
        }

        /**
         * 加载
         */
        private loadNextConfig(): void {
            //加载完成
            if (this.m_configs.length == 0) {
                this.m_onConfigComplete.call(this.m_onConfigCompleteTarget);
                this.m_onConfigComplete = null;
                this.m_onConfigCompleteTarget = null;
                return;
            }

            var arr: any = this.m_configs.shift();
            RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigCompleteHandle, this);
            RES.loadConfig(arr[0], arr[1]);
        }

        /**
         * 加载完成
         * @param event
         */
        private onConfigCompleteHandle(event: RES.ResourceEvent): void {
            RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigCompleteHandle, this);
            this.loadNextConfig();
        }

        public static get instance(): ResConfigManager {
            if (ResConfigManager.s_instance == null) {
                ResConfigManager.s_instance = new ResConfigManager();
            }
            return ResConfigManager.s_instance;
        }
    }
}