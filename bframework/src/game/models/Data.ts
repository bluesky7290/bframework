namespace ttaby {
	export class Data {
		// 登陆
		public static login: LoginModel = null;
		// 错误码
		public static error: ErrorCodeModel = null;

		public static Init(): void {
			this.login = new LoginModel();
			this.error = new ErrorCodeModel();
		}
	}
}