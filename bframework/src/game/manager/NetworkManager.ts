namespace ttaby {
	import EventManager = core.EventManager;
	import FrameEventCenter = core.FrameEventCenter;

	export class NetworkManager {
		private m_socketClient: SocketClient;
		private m_messageQueue: Array<egret.ByteArray>;

		public constructor() {
			this.m_messageQueue = new Array<egret.ByteArray>();
		}

		public SendConnect(): void {
			if (!this.m_socketClient) {
				this.m_socketClient = new SocketClient();
			}
			// 建立连接
			this.m_socketClient.SendConnect();
			FrameEventCenter.getInstance().addFrameEventListener(this.Update, this);
		}
		/**
		 * 添加消息到队列
		 */
		public AddMessage(message: egret.ByteArray): void {
			this.m_messageQueue.push(message);
		}
		/**
		 * 协议处理
		 */
		private Update(offset: number): boolean {
			if (!this.m_socketClient) {
				return true;
			}

			if (this.m_messageQueue.length > 0) {
				while (this.m_messageQueue.length > 0) {
					Event.Brocast(Protocal.Message, this.m_messageQueue.shift());
				}
			}
			return false;
		}
		/**
		 * 向服务器发送协议
		 */
		public SendMessage(buffer: egret.ByteArray): void {
			if(this.m_socketClient){
				this.m_socketClient.SessionSend(buffer);
			}
		}
		/**
		 * 关闭socket
		 */
		public Close(): void {
			if (this.m_socketClient) {
				this.m_socketClient.Close();
			}
			FrameEventCenter.getInstance().removeFrameEventListener(this.Update, this);
			this.m_socketClient = null;
		}
	}
}