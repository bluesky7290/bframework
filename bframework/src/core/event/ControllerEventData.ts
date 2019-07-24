module core {
    /**
     * 模块事件数据
     */
    export class ControllerEventData extends core.EventData {
        /**
         * 模块枚举
         */
        public controllerEnum: number;
        /**
         * @param  {string} messageID   事件ID
         * @param  {number} moduleEnum  模块枚举
         * @param  {any} data?          模块附加参数
         */
        constructor(messageID: string, controllerEnum: number, data?: any) {
            super(messageID, data);
            this.controllerEnum = controllerEnum;
        }
    }
}