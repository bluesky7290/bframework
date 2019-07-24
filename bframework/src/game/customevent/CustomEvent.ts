namespace ttaby {
	/**
	 * 断线重连
	 */
	export class CustomEvent extends core.EventData {
		/**
         * @param  {string} messageID   事件ID
         * @param  {any} data?          模块附加参数
         */
		public constructor(messageID: string, data?: any) {
			super(messageID, data);
		}
	}
}