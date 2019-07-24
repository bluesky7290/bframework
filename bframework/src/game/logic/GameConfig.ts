namespace ttaby {

	export class GameConfig {
		// public static GameIp: string = "192.168.1.162";
		// public static GamePort: number = 8989;

		public static GameIp: string = "h5gamelogin1.ttaby.haofeigame.com";
		public static GamePort: number = 19000;
		
		public static WebAddress: any = { "ip": GameConfig.GameIp, "port": GameConfig.GamePort };
		// 获得当前 WebIps
		public static GetWebIps(name): void {
			return this.WebAddress;
		}
	}
}