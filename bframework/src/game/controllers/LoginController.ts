namespace ttaby {
	import DateUtils = core.DateUtils;
	import Log = core.Log;

	export class LoginController extends BaseController {
		private m_LoginView: LoginView;

		public constructor() {
			super(ControllerEnum.LOGIN);
			this.Init();
		}

		/**
		 * 初始化
		 */
		private Init(): void {
			// 连接服务器成功,发送登陆协议
			Event.AddListener(NetEvt.NET_CMD_LOGIN, this.SendLogin, this);
		}

		private LoginBack(data: C2SSproto.login_response): void {

		}

		/**
		 * 同步服务器时间
		 */
		private SyncServerTimeStamp(data: C2SSproto.req_server_time_response): void {
			let code = data.error_code
			if (Data.error.IsOK(code)) {
				let ctime = Number(data.client_time);
				let stime = Number(data.server_time);
				let delay = (new Date().getTime() / 1000 - ctime) / 2.0;
				TimeManager.SetDelay(stime, delay);
			}
			else {
				Log.error("error_code DecodeMsg_ServerTimeReply ", code)
				CommonFunction.ShowTip(Data.error.Message(code));
			}
		}



		//开始登入 == 账号密码验证
		private SendLogin(): boolean {
			return false;
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
			return ['login'];
		}
		/**
		 * 显示
		 */
		protected show(data?: any): void {
			Log.error(`外部传递参数：${data}`);
			if (!this.m_LoginView) {
				this.m_LoginView = new LoginView(this);
				LayoutManager.fullScreen(this.m_LoginView);
			}
			this.addChildView(this.m_LoginView);
		}

		/**
		 * 隐藏
		 */
		protected hide(): void {
			this.removeChildView(this.m_LoginView);
			this.m_LoginView.release();
			this.m_LoginView = null;
			core.ResUtils.destoryGroups(['login']);
		}

		/**
		 * 删除监听
		 */
		protected removeListener(): void {

		}

		protected release(): void {
			super.release();
			this.removeListener();
		}
	}
}