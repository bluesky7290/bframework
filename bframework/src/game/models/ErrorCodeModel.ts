namespace ttaby {
	export class ErrorCodeModel extends BaseModel {
		public constructor() {
			super();
		}

		/**
		 * Model初始化
		 */
		protected Init(data?: any): void {

		}

		/**
		 * 释放内存
		 */
		protected Release(): void {
		}

		/**
		 * code时候是100000
		 */
		public IsOK(code): boolean {
			return code && code == 100000;
		}

		/**
		 * 错误码是不是name
		 */
		public IsCode(code, name): boolean {
			let errcode = Configuration.errorCode[code];
			if (errcode && name) {
				return errcode.name == name;
			}
		}

		/**
		 * 错误信息
		 */
		public Message(code): any {
			let ret = null, errmsg = null;
			errmsg = Configuration.errorCode[code];
			if (errmsg) {
				ret = errmsg.msg;
			}
			return ret;
		}
	}
}