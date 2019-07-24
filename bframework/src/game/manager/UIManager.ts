namespace ttaby {
    export class UIManager {

        private static s_instance: UIManager;

        private m_ControllerList: ControllerData[];

        private m_popupList: ControllerEnum[];

        constructor() {
            this.m_ControllerList = [];
            this.m_popupList = [];
        }

        /**
         * 得到Controller索引
         * @param  {controllerEnum} ControllerEnum
         */
        private getIndex(controllerEnum: ControllerEnum): number {
            let list: ControllerData[] = this.m_ControllerList;
            for (let i: number = 0, iLen: number = list.length; i < iLen; i++) {
                if (list[i].controllerEnum == controllerEnum) {
                    return i;
                }
            }
            return -1;
        }
        /**
         * @param  {ControllerEnum} openController  打开的Controller
         * @param  {any} openData?  打开所需参数
         */
        public openController(openController: ControllerEnum, openData?: any): void {
            let list: ControllerData[] = this.m_ControllerList;
            if (list.length > 0) {
                let controllerData: ControllerData = list[list.length - 1];
                core.EventManager.getInstance().sendEvent(new core.ControllerEventData(core.EventID.CONTROLLER_HIDE, controllerData.controllerEnum));
            }
            list.push(new ControllerData(openController, openData));
            core.EventManager.getInstance().sendEvent(new core.ControllerEventData(core.EventID.CONTROLLER_SHOW, openController, openData));
        }
        /**
         * 
         * @param  {ControllerEnum} closeController 关闭的Controller
         */
        public closeController(closeController: ControllerEnum): void {
            let index: number = this.getIndex(closeController);
            let list: ControllerData[] = this.m_ControllerList;
            if (index >= 0) {
                let controllerData: ControllerData = list.splice(index, 1)[0];
                core.EventManager.getInstance().sendEvent(new core.ControllerEventData(core.EventID.CONTROLLER_HIDE, controllerData.controllerEnum, controllerData.data));
            }
            if (list.length > 0) {
                let controllerData: ControllerData = list[list.length - 1];
                core.EventManager.getInstance().sendEvent(new core.ControllerEventData(core.EventID.CONTROLLER_SHOW, controllerData.controllerEnum, controllerData.data));
            }
        }
        /**
         * @param  {ControllerEnum} openController  要打开的Popup
         * @param  {any} openData?          打开附加参数
         */
        public openPopup(openController: ControllerEnum, openData?: any): void {
            if (this.m_popupList.indexOf(openController) < 0) {
                this.m_popupList.push(openController);
            }
            core.EventManager.getInstance().sendEvent(new core.ControllerEventData(core.EventID.CONTROLLER_SHOW, openController, openData));
        }
        /**
         * @param  {ControllerEnum} closeController 要关闭的Popup
         */
        public closePopup(closeController: ControllerEnum): void {
            let index: number = this.m_popupList.indexOf(closeController);
            if (index >= 0) {
                this.m_popupList.splice(index, 1);
                core.EventManager.getInstance().sendEvent(new core.ControllerEventData(core.EventID.CONTROLLER_HIDE, closeController));
            }
        }

        /**
         * 关闭所有Controller
         */
        public closeAllController(): void {
            let list: ControllerData[] = this.m_ControllerList;
            for (let i: number = 0, iLen: number = list.length; i < iLen; i++) {
                let controllerData: ControllerData = list[i];
                core.EventManager.getInstance().sendEvent(new core.ControllerEventData(core.EventID.CONTROLLER_HIDE, controllerData.controllerEnum));
            }
            list.length = 0;
        }
        /**
         * 关闭所有Controller及Popup
         */
        public closeAll(): void {
            this.closeAllController();
            let list: ControllerEnum[] = this.m_popupList;
            for (let i: number = 0, iLen: number = list.length; i < iLen; i++) {
                core.EventManager.getInstance().sendEvent(new core.ControllerEventData(core.EventID.CONTROLLER_HIDE, list[i]));
            }
            list.length = 0;
        }

        public static get instance(): UIManager {
            if (!UIManager.s_instance) {
                UIManager.s_instance = new UIManager();
            }
            return UIManager.s_instance;
        }
    }

    class ControllerData {

        public controllerEnum: ControllerEnum;

        public data: any;
        /**
         * @param  {ControllerEnum} ControllerEnum
         * @param  {any} data
         */
        constructor(ControllerEnum: ControllerEnum, data: any) {
            this.controllerEnum = ControllerEnum;
            this.data = data;
        }
    }
}