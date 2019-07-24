namespace ttaby {
	import FrameEventCenter = core.FrameEventCenter;
	import Log = core.Log;

	export class ServerConnecter {
		private static s_instance: ServerConnecter;
		private m_Reconnect: boolean = false;
		private m_ConnectOutTime: number = 2000;// 单次连接超时
		private m_connectcount: number = 3;// 尝试连接次数
		private m_connecting: boolean = false;
		private m_timeOut: number = 0;
		private m_PingCtrl: PingController;
		private m_Network: Network;

		public constructor() {
			this.m_PingCtrl = new PingController();
			this.m_Network = new Network();
		}

		public static get instance(): ServerConnecter {
			if (!ServerConnecter.s_instance) {
				ServerConnecter.s_instance = new ServerConnecter();
			}
			return ServerConnecter.s_instance;
		}

		public LoginServer(): void {
			this.m_Network.Start();
			this.m_PingCtrl.Init();
			this.Reset();
			FrameEventCenter.getInstance().addFrameEventListener(this.ConnectLogin, this);
		}
		/**
		 * 连接服务器
		 */
		private ConnectLogin(offset: number): boolean {
			if (this.m_connectcount <= 0) {
				CommonFunction.ShowTip("无法连接服务器，请稍后重试");
				GlobalConfig.NetworkMgr.Close();
				return true;
			}

			if (this.m_connecting) {
				if (this.m_Network.m_connected) {
					// 连上服务器
					if (GlobalConfig.OpenEncrypt) {
						GlobalConfig.MessageManager.SendClientKey();
					}
					Event.Brocast(NetEvt.NET_STATE_CONNECTED);
					if (this.m_Reconnect) {
						// 重连成功，抛出一个事件到业务层
						Event.Brocast(NetEvt.NET_CMD_LOGIN);
						this.m_Reconnect = false;
						core.EventManager.getInstance().sendEvent(new NetReconnected(CustomEventID.NETRECONNECTE));
					} else {
						// 登陆
						Event.Brocast(NetEvt.NET_CMD_LOGIN);
					}
					return true;
				}

				if (this.m_Network.m_connected == false && this.m_timeOut < this.m_ConnectOutTime) {
					this.m_timeOut += offset;
				} else {
					if (!this.m_Network.m_connected) {
						this.m_connecting = false;
					}
					this.m_timeOut = 0;
					this.m_connectcount--;
				}
			} else {
				if (this.m_Network.m_connected) {
					Event.Brocast(NetEvt.NET_STATE_DISCONNECTED);
				}
				if (!this.m_Network.m_connected) {
					GlobalConfig.NetworkMgr.SendConnect();
					this.m_connecting = true;
				}
			}
			return false;
		}

		private Reset(): void {
			this.m_connectcount = 100;
			this.m_timeOut = 0;
			this.m_connecting = false;
		}

		public ReconnectGame(): void {
			this.m_Reconnect = true;
			Data.login.account.isLogin = false;
			if (CurScene == SceneType.Room || CurScene == SceneType.Loading) {
				Event.Brocast(InternalEvt.CMD_CLEAR_ROOMDATA);
			}
			this.LoginServer()
		}
	}
}
