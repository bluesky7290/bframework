namespace ttaby {
	/**
	 * 事件回调数据
	 */
	class EventCallBack extends core.Callback {

		public index: number;

		public messageID: string | number;

		public isValid: boolean;
		/**
		 * @param  {(data?:any)=>void} callback	回调函数
		 * @param  {any} thisObj	this绑定
		 */
		constructor(callback: (data?: any) => void, thisObj?: any) {
			super(callback, thisObj);
			this.isValid = true;
		}
	}

	export class Event {
		private static m_callbackMaps: core.Dictionary<EventCallBack[]> = new core.Dictionary<EventCallBack[]>();
		/**
		 * 添加监听事件
		 */
		public static AddListener(messageID: any, callback: (data?: any) => boolean, thisObj: any): void {
			if (callback) {
				let data: EventCallBack = new EventCallBack(callback, thisObj);
				data.messageID = messageID;
				let callbacks: EventCallBack[] = this.m_callbackMaps.get(messageID);
				if (callbacks) {
					callbacks.push(data);
				} else {
					this.m_callbackMaps.add(messageID, [data]);
				}
			}
		}
		/**
		 * 广播事件
		 */
		public static Brocast(messageID: any, data?: any): void {
			let t: number = Date.now();
			let max: number = 0;
			let max_data: EventCallBack;
			let dataList: EventCallBack[] = this.m_callbackMaps.get(messageID);
			if (dataList) {
				dataList = dataList.concat();
				for (let i: number = 0, iLen: number = dataList.length; i < iLen; i++) {
					let eventCallBackta: EventCallBack = dataList[i];
					if (eventCallBackta.isValid) {
						let t1: number = Date.now();
						let ret = eventCallBackta.bindCallback(data);
						let t1_end: number = Date.now();
						if (ret) {
							this.RemoveListenerWithFunc(messageID, eventCallBackta.callback);
						}
						if (t1_end - t1 > max) {
							max = t1_end - t1;
							max_data = eventCallBackta;
						}
					}
				}
			} else {
				// Log.log("事件ID:" + event.messageID + "无监听回调");
			}
			let t_end: number = Date.now() - t;
			const allLimit: number = 10;
			const limit: number = 5;
			if (t_end > allLimit) {
				if (max_data && max > limit) {
					Log.log(`单帧事件派发耗时：${t_end} 最高耗时事件：${max_data.messageID} 耗时：${max}`);
				} else {
					Log.log(`单帧事件派发耗时：${t_end}`);
				}
			}
		}
		/**
		 * 移除事件监听
		 */
		public static RemoveListener(messageID: any, callback: (data?: any) => boolean): void {
			let callbacks: EventCallBack[] = this.m_callbackMaps.get(messageID);
			if (callbacks) {
				for (let i: number = callbacks.length; i > 0; i--) {
					let data: EventCallBack = callbacks[i - 1];
					if (data.callback == callback) {
						data.isValid = false;
						callbacks.splice(i - 1, 1);
						break;
					}
				}
			}
		}
		/**
		 * 移除事件监听
		 */
		private static RemoveListenerWithFunc(messageID: any, callback: Function): void {
			let callbacks: EventCallBack[] = this.m_callbackMaps.get(messageID);
			if (callbacks) {
				for (let i: number = callbacks.length; i > 0; i--) {
					let data: EventCallBack = callbacks[i - 1];
					if (data.callback == callback) {
						data.isValid = false;
						callbacks.splice(i - 1, 1);
						break;
					}
				}
			}
		}
	}
}