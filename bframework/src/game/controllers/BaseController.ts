namespace ttaby {
	/**
     * Controller基类
     */
	export abstract class BaseController extends core.Controller {
		private owerView: BaseView;
		/**
         * 初始化
         */
		protected init(): void {
			super.init();
			core.EventManager.getInstance().addEventListener(CustomEventID.NETRECONNECTE, this.onReconnected, this);
			core.EventManager.getInstance().addEventListener(CustomEventID.NETDISCONNECTED, this.onDisconnected, this);
			core.EventManager.getInstance().addEventListener(CustomEventID.GAMERESUME, this.OnResume, this);
			core.EventManager.getInstance().addEventListener(CustomEventID.GAMEPAUSE, this.OnPause, this);
		}
		/**
		 * 获取当前控制器的view
		 */
		public GetOwerView(): BaseView {
			return this.owerView;
		}
		/**
		 * 将一个 BaseView 子实例添加到该 LayerEnum.UI 层中
		 */
		protected addChildView(child: BaseView): void {
			this.owerView = child;
			core.LayerCenter.getInstance().getLayer(LayerEnum.UI).addChild(child);
		}
		/**
		 * 将一个 BaseView 子实例从 LayerEnum.UI 层中移除
		 */
		protected removeChildView(child: BaseView): void {
			this.owerView = null;
			if (child && child.parent) {
				child.parent.removeChild(child);
			}
		}
		/**
		 * 将一个 BaseView 子实例添加到该 LayerEnum.POPUP 层中
		 */
		protected addChildPopup(child: BaseView): void {
			this.owerView = child;
			core.LayerCenter.getInstance().getLayer(LayerEnum.POPUP).addChild(child);
		}
		/**
		 * 将一个 BaseView 子实例从 LayerEnum.POPUP 层中移除
		 */
		protected removeChildPopup(child: BaseView): void {
			this.owerView = null;
			if (child && child.parent) {
				child.parent.removeChild(child);
			}
		}
		/**
		 * 将一个 BaseView 子实例添加到该 LayerEnum.LOADING 层中
		 */
		protected addChildLoading(child: BaseView): void {
			this.owerView = child;
			core.LayerCenter.getInstance().getLayer(LayerEnum.LOADING).addChild(child);
		}
		/**
		 * 将一个 BaseView 子实例从 LayerEnum.LOADING 层中移除
		 */
		protected removeChildLoading(child: BaseView): void {
			this.owerView = null;
			if (child && child.parent) {
				child.parent.removeChild(child);
			}
		}
		/**
		 * 将一个 BaseView 子实例添加到该 LayerEnum.TOP 层中
		 */
		protected addChildTop(child: BaseView): void {
			this.owerView = child;
			core.LayerCenter.getInstance().getLayer(LayerEnum.LOADING).addChild(child);
		}
		/**
		 * 将一个 BaseView 子实例从 LayerEnum.TOP 层中移除
		 */
		protected removeChildTop(child: BaseView): void {
			this.owerView = null;
			if (child && child.parent) {
				child.parent.removeChild(child);
			}
		}
		/**
		 * 协议回掉监听
		 */
		public AddMessageDecoderFunc(funcKey, handler: Handler): void {
			GlobalConfig.MessageManager.AddMessageDecoderFunc(funcKey, handler);
		}

		/**
		 * 移除回调监听
		 */
		public RemoveMessageDecoderFunc(funcKey: any): void {
			GlobalConfig.MessageManager.RemoveMessageDecoderFunc(funcKey);
		}

		/**
		 * 向服务器发送数据
		 */
		public SendMsg(sprotoType: any, netCode?: any, msg?: Sp.SprotoTypeBase): void {
			GlobalConfig.MessageManager.SendMsg(sprotoType, netCode, msg);
		}
        /**
         * 重连成功
         */
		private onReconnected(data: ttaby.NetReconnected): void {
			if (this.IsOpen()) {
				this.reconnected(data.messageData);
			}
		}
        /**
         * 断线消息
         */
		private onDisconnected(data: ttaby.NetDisconnected): void {
			if (this.IsOpen()) {
				this.disconnected(data.messageData);
			}
		}
		/**
		 * 重连成功
		 */
		protected reconnected(data?: any): void { }
        /**
         * 网络断开
         */
		protected disconnected(data?: any): void { }
		/**
		 * 游戏从后台恢复
		 */
		private OnResume(): void {
			if (this.IsOpen()) {
				this.Resume();
			}
		}
		/**
		 * 游戏进入后台
		 */
		private OnPause(): void {
			if (this.IsOpen()) {
				this.Pause();
			}
		}
		/**
		 * 游戏从后台恢复
		 */
		protected Resume(data?: any): void { }
        /**
         * 游戏进入后台
         */
		protected Pause(data?: any): void { }
		/**
		 * 释放资源
		 */
		protected release(): void {
			super.release();
			core.EventManager.getInstance().removeEventListener(CustomEventID.NETRECONNECTE, this.onReconnected, this);
			core.EventManager.getInstance().removeEventListener(CustomEventID.NETDISCONNECTED, this.onDisconnected, this);
			core.EventManager.getInstance().removeEventListener(CustomEventID.GAMERESUME, this.OnResume, this);
			core.EventManager.getInstance().removeEventListener(CustomEventID.GAMEPAUSE, this.OnPause, this);
		}
	}
}
