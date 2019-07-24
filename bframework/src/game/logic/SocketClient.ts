namespace ttaby {
	import Socket = core.SocketAPI;
	import EventManager = core.EventManager;

	export class SocketClient {
		private static s_instance: NetworkManager;
		private m_socket: Socket;
		private m_byteBuffer: egret.ByteArray;
		private m_cacheByteBuffer: egret.ByteArray;
		private m_ip: string;
		private m_port: number;

		public constructor() {
		}

		/**
		 * 开始连接
		 */
		public SendConnect(): void {
			this.m_ip = GameConfig.GameIp;
			this.m_port = GameConfig.GamePort;
			this.m_byteBuffer = new egret.ByteArray();
			this.m_cacheByteBuffer = new egret.ByteArray();
			this.ConnectServer(this.m_ip, this.m_port);
		}

		public ConnectServer(host: string, port: number): void {
			EventManager.getInstance().addEventListener(core.EventID.SOCKET_CONNECT, this.onConnected, this);
			EventManager.getInstance().addEventListener(core.EventID.SOCKET_DATA, this.onSocketData, this);
			EventManager.getInstance().addEventListener(core.EventID.SOCKET_IOERROR, this.onIOError, this);
			EventManager.getInstance().addEventListener(core.EventID.SOCKET_CLOSE, this.onClosed, this);

			this.m_socket = new Socket();
			this.m_socket.setType(core.WebSocketTypeEnum.TYPE_BINARY);
			this.m_socket.setAddress(host, port, true); //true为外网，false为内网
			this.m_socket.connect();
		}

		private onConnected(e: core.EventData): void {
			Event.Brocast(Protocal.Connect);
		}

		private onSocketData(e: core.EventData): void {
			if (!this.m_byteBuffer) {
				return;
			}

			let byteBuffer: egret.ByteArray = e.messageData;
			// 拼接缓存数据
			if (this.m_cacheByteBuffer && this.m_cacheByteBuffer.bytesAvailable > 0) {
				this.m_byteBuffer.writeBytes(this.m_cacheByteBuffer, 0, this.m_cacheByteBuffer.bytesAvailable);
				this.m_byteBuffer.writeBytes(byteBuffer, this.m_cacheByteBuffer.bytesAvailable, byteBuffer.length);
				// 重置缓存区
				this.m_cacheByteBuffer.position = 0;
			} else {
				this.m_byteBuffer.writeBytes(byteBuffer);
				this.m_byteBuffer.position = 0;
			}

			// 协议处理
			while (this.m_byteBuffer.bytesAvailable > 0) {
				if (this.m_byteBuffer.bytesAvailable > 2) {
					let messageLen: number = this.m_byteBuffer.readUnsignedShort();// 包长
					if (this.m_byteBuffer.bytesAvailable >= messageLen) {
						let message: egret.ByteArray = new egret.ByteArray();
						this.m_byteBuffer.readBytes(message, 0, messageLen);
						// 派发消息
						GlobalConfig.NetworkMgr.AddMessage(message);
					} else {
						// 回退到包长
						this.m_byteBuffer.position -= 2;
						// 重置缓存区
						this.m_cacheByteBuffer.position = 0;
						this.m_cacheByteBuffer.writeBytes(this.m_byteBuffer, 0, this.m_byteBuffer.bytesAvailable);
						this.m_byteBuffer.clear();
					}
				} else {
					// 重置缓存区
					this.m_cacheByteBuffer.position = 0;
					this.m_cacheByteBuffer.writeBytes(this.m_byteBuffer, 0, this.m_byteBuffer.bytesAvailable);
					this.m_byteBuffer.clear();
				}
			}
			this.m_byteBuffer.clear();
		}

		private onIOError(e: core.EventData): void {
			Event.Brocast(Protocal.Exception);
			this.Close();
		}

		private onClosed(e: core.EventData): void {
			Event.Brocast(Protocal.Disconnect);
			this.Close();
		}

		/**
		 * 发送消息
		 */
		public SessionSend(buffer: egret.ByteArray): void {
			if (this.m_socket && this.m_socket.state == core.WebSocketStateEnum.CONNECTED) {
				this.m_socket.sendData(buffer);
			}
		}
		/**
		 * 移除监听
		 */
		public removeEventListener(): void {
			EventManager.getInstance().removeEventListener(core.EventID.SOCKET_CONNECT, this.onConnected, this);
			EventManager.getInstance().removeEventListener(core.EventID.SOCKET_DATA, this.onSocketData, this);
			EventManager.getInstance().removeEventListener(core.EventID.SOCKET_IOERROR, this.onIOError, this);
			EventManager.getInstance().removeEventListener(core.EventID.SOCKET_CLOSE, this.onClosed, this);
		}
		/**
		 * 关闭链接
		 */
		public Close(): void {
			if (this.m_socket && this.m_socket.state == core.WebSocketStateEnum.CONNECTED) {
				this.m_socket.close();
			}
			this.removeEventListener();
			this.m_byteBuffer = null;
			this.m_cacheByteBuffer = null;
			this.m_socket = null;
		}
	}
}