module core {
	/**
	 * Model基类
	 */
	export abstract class Model extends egret.HashObject{
		public constructor() {
			super();
		}

		/**
		 * Model初始化
		 */
		protected abstract Init(data?: any): void;
		/**
		 * 释放内存
		 */
		protected abstract Release(): void;
	}
}