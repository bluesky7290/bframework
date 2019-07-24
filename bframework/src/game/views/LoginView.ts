namespace ttaby {
	export class LoginView extends BaseView {
		public m_bg: eui.Image;
		public m_logo: eui.Image;
		public m_channel: eui.Group;
		public m_company: eui.Image;
		public m_outBtn: ttaby.ButtonEx;
		public m_customer: ttaby.ButtonEx;
		public m_version: eui.Label;
		public m_visitorBtn: ttaby.ButtonEx;
		public m_checkBox: eui.Group;
		public m_check: eui.Image;
		public m_agreetext: eui.Label;
		public m_agreetext0: eui.Label;
		public m_compinfo: eui.Label;
		public m_slogan: eui.Label;
		public m_copyright: eui.Label;

		private m_isAgree: boolean;

		public constructor(owerCtrl: BaseController) {
			super(owerCtrl);
			this.touchChildren = true;
			this.skinName = "resource/skins/LoginSkin.exml";
		}

		protected childrenCreated() {
			super.childrenCreated();
			this.Init();
			this.addListener();
		}

		protected addListener(): void {
			Event.AddListener(InternalEvt.CMD_LOGIN_CALLBACK, this.onLoginCallback, this);
			this.addListenerWithTap(this.m_outBtn, this.onClick, this);
			this.addListenerWithTap(this.m_visitorBtn, this.onClick, this);
			this.addListenerWithTap(this.m_checkBox, this.onCheck, this);
		}

		private Init(): void {
			CurScene = SceneType.Main;
			SoundManager.playBg("bgm01_mp3");
			let isCheck: string = egret.localStorage.getItem("login_check");
			if (isCheck && isCheck != "") {
				this.m_isAgree = true;
				this.m_check.visible = true;
			} else {
				egret.localStorage.setItem("login_check", "true");
				this.m_isAgree = false;
				this.m_check.visible = false;
			}
			this.displayLoginBtn();
		}

		//根据平台显示登陆按钮
		private displayLoginBtn(): void {

		}

		private onCheck(e: egret.TouchEvent): void {
			this.m_isAgree = !this.m_isAgree;
			this.m_check.visible = this.m_isAgree;
		}
		private onClick(e: egret.TouchEvent): void {
			if (e.target === this.m_outBtn) {
				//退出游戏
				Log.log("m_outBtn");
			} else if (e.target === this.m_visitorBtn) {
				//开始登陆
				if (!this.m_isAgree) {
					CommonFunction.ShowTip("请勾选同意下方的服务协议，即可进入游戏哦");
					return;
				}
				this.fastLogin();
			}
		}

		//游客快速登陆
		private fastLogin(): void {
			if (!Data.login.account["isLogin"]) {
			}
		}

		// 其他方式登陆接口
		private Login(call): void {
			//用户协议
			if (!this.m_isAgree) {
				CommonFunction.ShowTip("请勾选同意下方的服务协议，即可进入游戏哦");
				return;
			}

			//开始登陆

			//30s自动关闭   登陆动画

		}

		private onLoginCallback(msg: any): boolean {
			//先关闭登陆动画

			if (msg) {
				//showTip(msg);
			}
			return false;
		}

		protected removeListener(): void {
			Event.RemoveListener(InternalEvt.CMD_LOGIN_CALLBACK, this.onLoginCallback);
			this.removeListenerWithTap(this.m_outBtn, this.onClick, this);
			this.removeListenerWithTap(this.m_visitorBtn, this.onClick, this);
			this.removeListenerWithTap(this.m_checkBox, this.onClick, this);
		}

		public release() {
			this.removeListener();
		}
	}
}