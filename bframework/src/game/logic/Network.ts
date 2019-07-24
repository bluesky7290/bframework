namespace ttaby {
	import Log = core.Log;

	export class Network {
		public m_connected: boolean = false;

		public constructor() {
		}

		public Start(): void {
			this.m_connected = false;
			this.removeListener();
			Event.AddListener(Protocal.Connect, this.OnConnect, this);
			Event.AddListener(Protocal.Message, this.OnMessage, this);
			Event.AddListener(Protocal.Exception, this.OnException, this);
			Event.AddListener(Protocal.Disconnect, this.OnDisconnect, this);
		}

		public OnConnect(): boolean {
			Log.log('OnConnect-------->>>');
			this.m_connected = true;
			return false;
		}

		public OnMessage(data: egret.ByteArray): boolean {
			// Log.log('OnMessage-------->>>');
			Event.Brocast(NetEvt.NET_STATE_MESSAGEARRIVE, data);
			return false;
		}

		public OnException(): boolean {
			Log.error("OnException------->>>>");
			Event.Brocast(NetEvt.NET_STATE_DISCONNECTED);
			this.m_connected = false;
			return false;
		}

		public OnDisconnect(): boolean {
			Log.error("OnDisconnect------->>>>");
			Event.Brocast(NetEvt.NET_STATE_DISCONNECTED);
			this.m_connected = false;
			return false;
		}

		public removeListener(): void {
			Event.RemoveListener(Protocal.Connect, this.OnConnect);
			Event.RemoveListener(Protocal.Message, this.OnMessage);
			Event.RemoveListener(Protocal.Exception, this.OnException);
			Event.RemoveListener(Protocal.Disconnect, this.OnDisconnect);
		}
	}
}