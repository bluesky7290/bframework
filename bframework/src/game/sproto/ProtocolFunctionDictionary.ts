namespace Sp {
	export class MetaInfo {
		public ProtocolType;
		public RequestType;
		public ResponseType;
	}

	export class ProtocolFunctionDictionary {
		private MetaDictionary: { [key: number]: MetaInfo };

		public constructor() {
			this.MetaDictionary = {}
		}

		private _GetMeta(tag: number): MetaInfo {
			let data = this.MetaDictionary[tag];
			if (data == null) {
				data = new MetaInfo();
				this.MetaDictionary[tag] = data;
			}
			return data;
		}

		public SetProtocol(tag: number): void {
			let data = this._GetMeta(tag);
			data.ProtocolType = tag;
		}

		public SetRequest(tag: number, cls: any): void {
			let data = this._GetMeta(tag);
			data.RequestType = new cls;
		}

		public SetResponse(tag: number, cls: any): void {
			let data = this._GetMeta(tag);
			data.ResponseType = new cls;
		}

		public GenResponse(tag: number): SprotoTypeBase {
			let data = this.MetaDictionary[tag];
			if (data.ResponseType == null) {
				return null
			}
			return data.ResponseType.reset();
		}

		public GenRequest(tag: number): SprotoTypeBase {
			let data = this.MetaDictionary[tag];
			if (data.RequestType == null) {
				return null
			}
			return data.RequestType.reset();
		}
	}
}