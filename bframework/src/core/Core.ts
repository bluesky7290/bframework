module core {
	export class Core {
		/**
		 * 框架入口类，本类应在程序主入口调用run方法进行初始化
		 */
		public constructor() {
		}

		public static run(stage: egret.Stage): void {
			egret.ImageLoader.crossOrigin = 'anonymous';
			core.FrameEventCenter.getInstance().init(stage);
			core.LayerCenter.getInstance().init(stage);
			RES.setMaxLoadingThread(8);

			core.WebUtils.addKeyboardListener();
			core.Log.logLevel = core.Logger.OFF;
		}
	}
}
