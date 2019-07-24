namespace ttaby {
	export abstract class BaseModel extends core.Model {

		public constructor() {
			super();
			this.Init();
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
	}
}