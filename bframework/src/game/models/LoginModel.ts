namespace ttaby {
	export class LoginModel extends BaseModel {
		public account: any = {};
		private fastlogin: string = "fastlogin";
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
			this.account = {};
		}

		//保存账号
		public SaveAccount(): void {
			Log.log("save account " + this.account.login_type);
			if (this.account.login_type === this.fastlogin) {
				let openid = this.account.account_id;
				let token = this.account.token;
				egret.localStorage.setItem(this.fastlogin, openid + ";" + token);
			}
			//登陆成功
			this.account.isLogin = true;
		}

		//初始化快速登陆的账号
		public InitFastLoginAccount(): void {
			let openid: string = "";
			let token: string = "";

			let data: string = egret.localStorage.getItem(this.fastlogin);
			if (data && data != "") {
				let strArr = data.split(";");
				openid = strArr[0];
				token = strArr[1];
			}

			this.account.account_id = openid;
			this.account.token = token;
			this.account.login_type = this.fastlogin;
			this.account.channelId = "GF0SN10000";
			this.account.channelName = "fast";

			this.account.extra = JSON.stringify({});
		}
		//获取当前登陆平台
		public GetCurrentLoginPlatform(): void {
			return this.account.channelName;
		}

		private static s_instance: LoginModel;
		public static getInstance() {
			if (!this.s_instance) {
				this.s_instance = new LoginModel();
			}
			return this.s_instance;
		}
	}
}