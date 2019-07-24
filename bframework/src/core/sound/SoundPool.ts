namespace core {
	export class SoundPool {
		private static createSoundObjectCallBack: Function;
		private static _content: { [key: string]: Array<any> } = {};

        /**
         * 一次创建对象数量
         */
		public static InitObjecPooltWithCount(refKey: string, count: number, callback: Function): void {
			if (!this._content[refKey]) {
				this._content[refKey] = [];
			}

			this.createSoundObjectCallBack = callback;

			for (let i = 0; i < count; i++) {
				let soundObj: any = callback();
				soundObj.ObjectPoolKey = refKey;
				this.push(soundObj);
			}
		}
        /**
         * 取出一个对象
         * @param classZ Class
         * @return Object
         *
         */
		public static pop(refKey: string, ...args: any[]): any {
			if (!this._content[refKey]) {
				this._content[refKey] = [];
			}

			var list: Array<any> = this._content[refKey];
			if (list.length > 0) {
				return list.pop();
			} else {
				return this.createSoundObjectCallBack();
			}
		}

        /**
         * 放入一个对象
         * @param obj
         *
         */
		public static push(obj: any): boolean {
			if (obj == null) {
				return false;
			}

			var refKey: any = obj.ObjectPoolKey;
			//保证只有pop出来的对象可以放进来，或者是已经清除的无法放入
			if (!this._content[refKey]) {
				return false;
			}
			
			this._content[refKey].push(obj);
			return true;
		}

        /**
         * 清除所有对象
         */
		public static clear(): void {
			for (let k in this._content) {
				ArrayUtils.clear(this._content[k]);
			}
			this._content = {};
		}

        /**
         * 清除某一类对象
         * @param classZ Class
         * @param clearFuncName 清除对象需要执行的函数
         */
		public static clearClass(refKey: string): void {
			var list: Array<any> = this._content[refKey];
			ArrayUtils.clear(list);
			this._content[refKey] = null;
			delete this._content[refKey];
		}
	}
}