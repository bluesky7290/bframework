namespace ttaby {
	import Dictionary = core.Dictionary;

	export class MessageManager {
		private static s_instance: MessageManager;
		private server_push = null;
		private server = null;
		private client = null;

		private serverHost = null;
		private clientHost = null;
		private clientSender = null;
		private clientKey: string;
		private sendBuffer: egret.ByteArray;
		private MessageDecoder: Dictionary<Handler> = new Dictionary<Handler>();

		public constructor() {
			this.sendBuffer = new egret.ByteArray();
			this.Init();
		}

		public Init(): void {
			let abc2s: ArrayBuffer = ResManager.getRes('c2s.bin');
			let bufc2s = BufferNode.allocUnsafe(abc2s.byteLength);
			let view = new Uint8Array(abc2s);
			for (let i = 0; i < bufc2s.length; ++i) {
				bufc2s[i] = view[i];
			}

			let abs2c: ArrayBuffer = ResManager.getRes('s2c.bin');
			let bufs2c = BufferNode.allocUnsafe(abs2c.byteLength);
			view = new Uint8Array(abs2c);
			for (var i = 0; i < bufs2c.length; ++i) {
				bufs2c[i] = view[i];
			}

			ResManager.RemoveZipFile('c2s.bin');
			ResManager.RemoveZipFile('s2c.bin');

			let server = Sproto.createNew(bufc2s);
			this.serverHost = server.host();
			let serverSender = this.serverHost.attach(Sproto.createNew(bufs2c));

			let client = Sproto.createNew(bufs2c);
			this.clientHost = client.host();
			this.clientSender = this.clientHost.attach(Sproto.createNew(bufc2s));

			// let server_proto_push = Sproto.createNew(bufs2c);
			// let server_proto = Sproto.createNew(bufc2s);
			// this.server_push = server_proto_push.host();
			// this.server = server_proto.host();

			// let client_proto = Sproto.createNew(bufc2s);
			// this.client = client_proto.host();
			// this.client_req = this.client.attach(server_proto);

			// let buffer = this.client_req(GlobalConfig.C2SProtocol.req_room_info, GlobalConfig.C2SProtocol.req_room_info_Request, 1);
			// var a = UEncrypt.DESEncrypt(buffer.toString(), '123');
			// var b: string = UEncrypt.DESDecrypt(a, '123');
			// var arr = b.split(",");
			// var tmpUint8Array = new Uint8Array(arr.length);
			// for (let i = 0; i < arr.length; i++) {
			// 	tmpUint8Array[i] = Number(arr[i]);
			// }

			// let ret = this.server.dispatch(tmpUint8Array);
			// console.log(ret);
			Event.AddListener(NetEvt.NET_STATE_MESSAGEARRIVE, this.Decode, this);
			// 跑马灯推送
			this.AddMessageDecoderFunc(NetOpCodes.V_BROADCAST, Handler.create(this, this.DecodeMsg_BroadcastReplay));
			// GM命令
			this.AddMessageDecoderFunc(NetOpCodes.V_GM, Handler.create(this, this.DecodeMsg_GMBack));
			// vip信息推送
			this.AddMessageDecoderFunc(NetOpCodes.V_GET_VIP_INFO, Handler.create(this, this.DecodeMsg_Get_Vip_Info));
		}

		/**GM 回包*/
		public DecodeMsg_GMBack(data: C2SSproto.gm_response): void {
			Log.log("GM 回包" + data);
			if (!data.result) {
				return;
			}
		}

		/**
		 * 跑马灯推送消息
		 */
		private DecodeMsg_BroadcastReplay(data: any) {
			if (data.type == 3) {
				Event.Brocast(NetEvt.NET_BROADCAST, data);
			} else {
				Event.Brocast(NetEvt.NET_BROADCAST_NORMAL, data);
				Event.Brocast(InternalEvt.CMD_INSERT_BROADCAST); //打开跑马灯板子
			}
		}

		/**
		 * 服务器推送vip信息
		 */
		private DecodeMsg_Get_Vip_Info(data: any): void {
			
		}

		// Message Decoders ////////////////////////////////-
		public Decode(msg: egret.ByteArray): boolean {
			if (msg.length <= 0) {
				return false;
			}
			// 在房间切到后台，将消息抛掉
			// 解密 DES start
			let data = null;
			if (GlobalConfig.OpenEncrypt) {
				data = UEncrypt.DESDecrypt(msg, this.clientKey);
			}
			// 解密 end
			let ret = this.clientHost.dispatch(msg.bytes);
			let type = ret.type;
			let result = ret.result;
			Log.log(ret);
			if (type === "REQUEST") {
				let name = ret.name;
				Log.error("proto name >>>>>>>> ", name);
				let handler: Handler = this.MessageDecoder.get(name);
				if (handler) {
					handler.runWith(result);
				} else {
					// Log.error(`MessageManager.Decode unhandle proto ${name}`);
				}
			} else if (type === "RESPONSE") {
				let handler: Handler = this.MessageDecoder.get(ret.session);
				if (handler) {
					handler.runWith(result);
				} else {
					// Log.error(`MessageManager.Decode unhandle session ${ret.session}`);
				}
			}
			let handler: Handler = this.MessageDecoder.get(NetOpCodes.V_PING);
			if (handler) {
				handler.runWith(result);
			}
			return false;
		}

		// 协议回调监听
		public AddMessageDecoderFunc(funcKey: any, handler: Handler): void {
			if (this.MessageDecoder.indexOfKey(funcKey) >= 0) {
				Log.error(`消息 id {${funcKey}} exist`);
				return;
			}
			this.MessageDecoder.add(funcKey, handler);
		}

		// 移除回调监听
		public RemoveMessageDecoderFunc(funcKey: any): void {
			this.MessageDecoder.remove(funcKey);
		}

		/**
		 * 向服务器发送数据
		 */
		public SendMsg(sprotoType: any, netCode: any, msg?: Sp.SprotoTypeBase): void {
			// Log.log("SendMsg");
			let code = this.clientSender(sprotoType, msg, netCode);
			if (GlobalConfig.OpenEncrypt) {
				//对buffer做DES加密
				code = UEncrypt.DESEncrypt(code.toString(), this.clientKey);
			}
			if (code) {
				this.sendBuffer._writeUint8Array(code);
				GlobalConfig.NetworkMgr.SendMessage(this.sendBuffer);
				this.sendBuffer.clear();
			}
		}

		// RES 加密 客户端秘钥  第一次
		public SendClientKey(): void {
			// AES秘钥 32位字符串
			//    this.clientKey = UEncrypt.GenerateRandom(32);
			// DES秘钥 8位字符串
			this.clientKey = UEncrypt.GenerateRandom(8);
			//用RSA 加密 秘钥 得到 加密后的秘钥
			let code = UEncrypt.RSAEncrypt(this.clientKey);
			this.sendBuffer.writeUTF(code);
			GlobalConfig.NetworkMgr.SendMessage(this.sendBuffer);
			this.sendBuffer.clear();
		}
	}
}