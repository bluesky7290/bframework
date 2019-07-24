namespace ttaby {
	class EventObject {
		public eventType: string;
		public eventFunc: Function;
		public eventListener: Function;
		public eventThisObject: any;
		public eventObject: eui.UIComponent;
		public eventUseCapture: boolean;
	}

	export abstract class BaseView extends core.EUIComponent {
		private eventsMap = {};

		protected owerCtrl: BaseController;

		public constructor(owerCtrl: BaseController) {
			super();
			this.owerCtrl = owerCtrl;
		}

		/**
         * 注册点击事件
         */
		public addListenerWithTap(eventObject: eui.UIComponent, listener: Function, thisObject: any, eventEffectName: string = "ui_click_mp3", useCapture?: boolean, priority?: number): boolean {
			let list: Array<EventObject> = this.eventsMap[egret.TouchEvent.TOUCH_TAP];
			if (!list) {
				list = this.eventsMap[egret.TouchEvent.TOUCH_TAP] = [];
			}

			let length = list.length;
			for (let i = 0; i < length; i++) {
				let bin: EventObject = list[i];
				if (bin.eventListener == listener && bin.eventObject === eventObject) {
					return false;
				}
			}

			let func = function onClick(e: egret.TouchEvent): void {
				SoundManager.playEffect(eventEffectName);
				let ret = listener.call(thisObject, e)
				if (ret) {
					(thisObject as BaseView).removeListenerWithTap(e.target, listener, thisObject);
				}
			}

			let eventMap: EventObject = new EventObject();
			eventMap.eventType = egret.TouchEvent.TOUCH_TAP;
			eventMap.eventObject = eventObject;
			eventMap.eventFunc = func;
			eventMap.eventListener = listener;
			eventMap.eventThisObject = thisObject;
			eventMap.eventUseCapture = useCapture;
			list.push(eventMap);
			return eventObject.addEventListener(egret.TouchEvent.TOUCH_TAP, func, thisObject, useCapture, priority);
		}
        /**
         * 移除点击事件
         */
		public removeListenerWithTap(eventObject: eui.UIComponent, listener: Function, thisObject: any): boolean {
			let list: Array<EventObject> = this.eventsMap[egret.TouchEvent.TOUCH_TAP];
			if (!list) {
				return false;
			}

			let length = list.length;
			for (let i = length; i > 0; i--) {
				let bin: EventObject = list[i - 1];
				if (bin.eventListener == listener && bin.eventObject === eventObject) {
					list.splice(i, 1);
					eventObject.removeEventListener(egret.TouchEvent.TOUCH_TAP, bin.eventFunc, bin.eventThisObject, bin.eventUseCapture);
					return true;
				}
			}

			if (list.length == 0) {
				this.eventsMap[egret.TouchEvent.TOUCH_TAP] = null;
			}
		}
		/**
		 * 移除指定view子节点上的所有点击事件
		 */
		public removeAllListenerWithTap(thisObject: any): boolean {
			let list: Array<EventObject> = this.eventsMap[egret.TouchEvent.TOUCH_TAP];
			if (!list) {
				return false;
			}

			let length = list.length;
			for (let i = length; i > 0; i--) {
				let bin: EventObject = list[i - 1];
				if (bin.eventThisObject === thisObject) {
					list.splice(i, 1);
					bin.eventObject.removeEventListener(egret.TouchEvent.TOUCH_TAP, bin.eventFunc, bin.eventThisObject, bin.eventUseCapture);
				}
			}

			if (list.length == 0) {
				this.eventsMap[egret.TouchEvent.TOUCH_TAP] = null;
			}

			return true;
		}
		/**
         * 注册按下事件
         */
		public addListenerWithDown(eventObject: eui.UIComponent, listener: Function, thisObject: any, useCapture?: boolean, priority?: number): boolean {
			let list: Array<EventObject> = this.eventsMap[egret.TouchEvent.TOUCH_BEGIN];
			if (!list) {
				list = this.eventsMap[egret.TouchEvent.TOUCH_BEGIN] = [];
			}

			let length = list.length;
			for (let i = length; i > 0; i--) {
				let bin: EventObject = list[i - 1];
				if (bin.eventListener == listener && bin.eventObject === eventObject) {
					return false;
				}
			}

			let func = function onClick(e: egret.TouchEvent): void {
				let ret = listener.call(thisObject, e)
				if (ret) {
					(thisObject as BaseView).removeListenerWithDown(e.target, listener, thisObject);
				}
			}

			let eventMap: EventObject = new EventObject();
			eventMap.eventType = egret.TouchEvent.TOUCH_BEGIN;
			eventMap.eventObject = eventObject;
			eventMap.eventFunc = func;
			eventMap.eventListener = listener;
			eventMap.eventThisObject = thisObject;
			eventMap.eventUseCapture = useCapture;
			list.push(eventMap);
			return eventObject.addEventListener(egret.TouchEvent.TOUCH_BEGIN, func, thisObject, useCapture, priority);
		}
		/**
		 * 移除按下事件
		*/
		public removeListenerWithDown(eventObject: eui.UIComponent, listener: Function, thisObject: any): boolean {
			let list: Array<EventObject> = this.eventsMap[egret.TouchEvent.TOUCH_BEGIN];
			if (!list) {
				return false;
			}

			let length = list.length;
			for (let i = length; i > 0; i--) {
				let bin: EventObject = list[i - 1];
				if (bin.eventListener == listener && bin.eventObject === eventObject) {
					list.splice(i, 1);
					eventObject.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, bin.eventFunc, bin.eventThisObject, bin.eventUseCapture);
					return true;
				}
			}

			if (list.length == 0) {
				this.eventsMap[egret.TouchEvent.TOUCH_BEGIN] = null;
			}
		}
		/**
		 * 移除指定view子节点上的所有按下事件
		 */
		public removeAllListenerWithDown(thisObject: any): boolean {
			let list: Array<EventObject> = this.eventsMap[egret.TouchEvent.TOUCH_BEGIN];
			if (!list) {
				return false;
			}

			let length = list.length;
			for (let i = length; i > 0; i--) {
				let bin: EventObject = list[i - 1];
				if (bin.eventThisObject === thisObject) {
					list.splice(i, 1);
					bin.eventObject.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, bin.eventFunc, bin.eventThisObject, bin.eventUseCapture);
				}
			}

			if (list.length == 0) {
				this.eventsMap[egret.TouchEvent.TOUCH_BEGIN] = null;
			}

			return true;
		}
		/**
         * 注册移动事件
         */
		public addListenerWithMove(eventObject: eui.UIComponent, listener: Function, thisObject: any, useCapture?: boolean, priority?: number): boolean {
			let list: Array<EventObject> = this.eventsMap[egret.TouchEvent.TOUCH_MOVE];
			if (!list) {
				list = this.eventsMap[egret.TouchEvent.TOUCH_MOVE] = [];
			}

			let length = list.length;
			for (let i = 0; i < length; i++) {
				let bin: EventObject = list[i];
				if (bin.eventListener == listener && bin.eventObject === eventObject) {
					return false;
				}
			}

			let func = function onClick(e: egret.TouchEvent): void {
				let ret = listener.call(thisObject, e)
				if (ret) {
					(thisObject as BaseView).removeListenerWithMove(e.target, listener, thisObject);
				}
			}

			let eventMap: EventObject = new EventObject();
			eventMap.eventType = egret.TouchEvent.TOUCH_MOVE;
			eventMap.eventObject = eventObject;
			eventMap.eventFunc = func;
			eventMap.eventListener = listener;
			eventMap.eventThisObject = thisObject;
			eventMap.eventUseCapture = useCapture;
			list.push(eventMap);
			return eventObject.addEventListener(egret.TouchEvent.TOUCH_MOVE, func, thisObject, useCapture, priority);
		}
		/**
		 * 移除移动事件
		*/
		public removeListenerWithMove(eventObject: eui.UIComponent, listener: Function, thisObject: any): boolean {
			let list: Array<EventObject> = this.eventsMap[egret.TouchEvent.TOUCH_MOVE];
			if (!list) {
				return false;
			}

			let length = list.length;
			for (let i = length; i > 0; i--) {
				let bin: EventObject = list[i - 1];
				if (bin.eventListener == listener && bin.eventObject === eventObject) {
					list.splice(i, 1);
					eventObject.removeEventListener(egret.TouchEvent.TOUCH_MOVE, bin.eventFunc, bin.eventThisObject, bin.eventUseCapture);
					return true;
				}
			}

			if (list.length == 0) {
				this.eventsMap[egret.TouchEvent.TOUCH_MOVE] = null;
			}
		}
		/**
		 * 移除指定view子节点上的所有移动事件
		 */
		public removeAllListenerWithMove(thisObject: any): boolean {
			let list: Array<EventObject> = this.eventsMap[egret.TouchEvent.TOUCH_MOVE];
			if (!list) {
				return false;
			}

			let length = list.length;
			for (let i = length; i > 0; i--) {
				let bin: EventObject = list[i - 1];
				if (bin.eventThisObject === thisObject) {
					list.splice(i, 1);
					bin.eventObject.removeEventListener(egret.TouchEvent.TOUCH_MOVE, bin.eventFunc, bin.eventThisObject, bin.eventUseCapture);
				}
			}

			if (list.length == 0) {
				this.eventsMap[egret.TouchEvent.TOUCH_MOVE] = null;
			}

			return true;
		}
		/**
         * 注册超出事件
         */
		public addListenerWithOut(eventObject: eui.UIComponent, listener: Function, thisObject: any, useCapture?: boolean, priority?: number): boolean {
			let list: Array<EventObject> = this.eventsMap[egret.TouchEvent.TOUCH_RELEASE_OUTSIDE];
			if (!list) {
				list = this.eventsMap[egret.TouchEvent.TOUCH_RELEASE_OUTSIDE] = [];
			}

			let length = list.length;
			for (let i = 0; i < length; i++) {
				let bin: EventObject = list[i];
				if (bin.eventListener == listener && bin.eventObject === eventObject) {
					return false;
				}
			}

			let func = function onClick(e: egret.TouchEvent): void {
				let ret = listener.call(thisObject, e)
				if (ret) {
					(thisObject as BaseView).removeListenerWithOut(e.target, listener, thisObject);
				}
			}

			let eventMap: EventObject = new EventObject();
			eventMap.eventType = egret.TouchEvent.TOUCH_RELEASE_OUTSIDE;
			eventMap.eventObject = eventObject;
			eventMap.eventFunc = func;
			eventMap.eventListener = listener;
			eventMap.eventThisObject = thisObject;
			eventMap.eventUseCapture = useCapture;
			list.push(eventMap);
			return eventObject.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, func, thisObject, useCapture, priority);
		}
		/**
		 * 移除超出事件
		*/
		public removeListenerWithOut(eventObject: eui.UIComponent, listener: Function, thisObject: any): boolean {
			let list: Array<EventObject> = this.eventsMap[egret.TouchEvent.TOUCH_RELEASE_OUTSIDE];
			if (!list) {
				return false;
			}

			let length = list.length;
			for (let i = length; i > 0; i--) {
				let bin: EventObject = list[i - 1];
				if (bin.eventListener == listener && bin.eventObject === eventObject) {
					list.splice(i, 1);
					eventObject.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, bin.eventFunc, bin.eventThisObject, bin.eventUseCapture);
					return true;
				}
			}

			if (list.length == 0) {
				this.eventsMap[egret.TouchEvent.TOUCH_RELEASE_OUTSIDE] = null;
			}
		}
		/**
		 * 移除指定view子节点上的所有超出事件
		 */
		public removeAllListenerWithOut(thisObject: any): boolean {
			let list: Array<EventObject> = this.eventsMap[egret.TouchEvent.TOUCH_RELEASE_OUTSIDE];
			if (!list) {
				return false;
			}

			let length = list.length;
			for (let i = length; i > 0; i--) {
				let bin: EventObject = list[i - 1];
				if (bin.eventThisObject === thisObject) {
					list.splice(i, 1);
					bin.eventObject.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, bin.eventFunc, bin.eventThisObject, bin.eventUseCapture);
				}
			}

			if (list.length == 0) {
				this.eventsMap[egret.TouchEvent.TOUCH_RELEASE_OUTSIDE] = null;
			}

			return true;
		}
		/**
         * 注册抬起事件
         */
		public addListenerWithUp(eventObject: eui.UIComponent, listener: Function, thisObject: any, useCapture?: boolean, priority?: number): boolean {
			let list: Array<EventObject> = this.eventsMap[egret.TouchEvent.TOUCH_END];
			if (!list) {
				list = this.eventsMap[egret.TouchEvent.TOUCH_END] = [];
			}

			let length = list.length;
			for (let i = 0; i < length; i++) {
				let bin: EventObject = list[i];
				if (bin.eventListener == listener && bin.eventObject === eventObject) {
					return false;
				}
			}

			let func = function onClick(e: egret.TouchEvent): void {
				let ret = listener.call(thisObject, e)
				if (ret) {
					(thisObject as BaseView).removeListenerWithUp(e.target, listener, thisObject);
				}
			}

			let eventMap: EventObject = new EventObject();
			eventMap.eventType = egret.TouchEvent.TOUCH_END;
			eventMap.eventObject = eventObject;
			eventMap.eventFunc = func;
			eventMap.eventListener = listener;
			eventMap.eventThisObject = thisObject;
			eventMap.eventUseCapture = useCapture;
			list.push(eventMap);
			return eventObject.addEventListener(egret.TouchEvent.TOUCH_END, func, thisObject, useCapture, priority);
		}
		/**
		 * 移除抬起事件
		*/
		public removeListenerWithUp(eventObject: eui.UIComponent, listener: Function, thisObject: any): boolean {
			let list: Array<EventObject> = this.eventsMap[egret.TouchEvent.TOUCH_END];
			if (!list) {
				return false;
			}

			let length = list.length;
			for (let i = length; i > 0; i--) {
				let bin: EventObject = list[i - 1];
				if (bin.eventListener == listener && bin.eventObject === eventObject) {
					list.splice(i, 1);
					eventObject.removeEventListener(egret.TouchEvent.TOUCH_END, bin.eventFunc, bin.eventThisObject, bin.eventUseCapture);
					return true;
				}
			}

			if (list.length == 0) {
				this.eventsMap[egret.TouchEvent.TOUCH_END] = null;
			}
		}
		/**
		 * 移除指定view子节点上的所有抬起事件
		 */
		public removeAllListenerWithUp(thisObject: any): boolean {
			let list: Array<EventObject> = this.eventsMap[egret.TouchEvent.TOUCH_END];
			if (!list) {
				return false;
			}

			let length = list.length;
			for (let i = length; i > 0; i--) {
				let bin: EventObject = list[i - 1];
				if (bin.eventThisObject === thisObject) {
					list.splice(i, 1);
					bin.eventObject.removeEventListener(egret.TouchEvent.TOUCH_END, bin.eventFunc, bin.eventThisObject, bin.eventUseCapture);
				}
			}

			if (list.length == 0) {
				this.eventsMap[egret.TouchEvent.TOUCH_END] = null;
			}

			return true;
		}
	}
}