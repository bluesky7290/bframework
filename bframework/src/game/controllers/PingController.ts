namespace ttaby {
	import Log = core.Log;

	/**
	 * 心跳处理，网络监控
	 */
	export class PingController extends BaseController {
		private IsRun: boolean = false;
		private recvPacketTimeout: number = 6;
		private sendPingStart: number = 3;
		private recvPacketTimer: number = 0;
		private pingDur: number = 3;
		private pingCount: number = 0;

		public constructor() {
			super(ControllerEnum.PING);
		}

		public Init(): void {
			this.removeListener();
			Event.AddListener(NetEvt.NET_STATE_CONNECTED, this.OnConnect, this);
			Event.AddListener(NetEvt.NET_STATE_DISCONNECTED, this.OnDisConnect, this);
			// 注册协议回掉函数
			this.AddMessageDecoderFunc(NetOpCodes.V_PING, Handler.create(this, this.OnPingBack));

			core.FrameEventCenter.getInstance().addFrameEventListener(this.Update, this);
			this.IsRun = false;
		}

		public Update(offset: number): boolean {
			let deltaTime: number = offset / 1000;
			if (this.IsRun) {
				this.recvPacketTimer = this.recvPacketTimer + deltaTime;
				if (this.recvPacketTimer > this.recvPacketTimeout) {
					Log.error("------ recvPk timeout -------");
					console.log("------ recvPk timeout -------");
					core.EventManager.getInstance().sendEvent(new NetDisconnected(CustomEventID.NETDISCONNECTED));
					this.DisConnect();
					GlobalConfig.NetworkMgr.Close();
					ServerConnecter.instance.ReconnectGame();
				}

				if (this.recvPacketTimer > this.sendPingStart) {
					if (this.pingCount <= 0) {
						this.pingCount = this.pingDur;
						this.SendPing();
					} else {
						this.pingCount -= deltaTime;
					}
				}
			}
			return false;
		}

		private OnConnect(): boolean {
			this.IsRun = true;
			this.SendPing();
			this.Reset();
			return false;
		}

		/**
		 * 断开心跳
		 */
		private OnDisConnect(): boolean {
			Log.warn("OnDisConnect");
			console.log("------ OnDisConnect -------");
			GlobalConfig.NetworkMgr.Close();
			return false;
		}

		/**
		 * 心跳返回
		 */
		private OnPingBack(data: C2SSproto.heartbeat_response): void {
			console.log("------ OnPingBack -------");
			this.Reset();
		}

		private Reset(): void {
			this.recvPacketTimer = 0;
			this.pingCount = 0;
		}

		/**
		 * 调用发送心跳包
		 */
		private SendPing(): void {
			Log.log("发送心跳");
			this.SendMsg(GlobalConfig.C2SProtocol.heartbeat, NetOpCodes.V_PING);
		}

		/**
		 * 断线处理
		 */
		private DisConnect(): void {
			Log.warn("连接中断");
			this.IsRun = false;
			this.Reset();
		}

		/**
		 * 游戏从后台恢复
		 */
		protected Resume(): void {
			this.Reset();
		}
		/**
		 * 游戏进入后台
		 */
		protected Pause(): void {
		}
		/**
		 * 移除监听
		 */
		public removeListener(): void {
			Event.RemoveListener(NetEvt.NET_STATE_CONNECTED, this.OnConnect);
			Event.RemoveListener(NetEvt.NET_STATE_DISCONNECTED, this.OnDisConnect);
			this.RemoveMessageDecoderFunc(NetOpCodes.V_PING);
			core.EventManager.getInstance().removeEventListener(CustomEventID.GAMERESUME, this.Resume, this);
			core.EventManager.getInstance().removeEventListener(CustomEventID.GAMEPAUSE, this.Pause, this);
			core.FrameEventCenter.getInstance().removeFrameEventListener(this.Update, this);
		}
		/**
		* 获取loading
		*/
		protected getLoading(): core.ILoadingUI {
			return core.LoadingManager.getLoading(MainLoadingView);
		}
		/**
		 * 预加载资源组
		 */
		protected getLoadGroup(data?: core.ControllerEventData): string[] {
			return [''];
		}
		/**
		 * 显示
		 */
		protected show(data?: any): void {
		}
		/**
		 * 隐藏
		 */
		protected hide(): void {
		}
	}
}