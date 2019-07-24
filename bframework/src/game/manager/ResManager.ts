namespace ttaby {
	export class ResManager {
		private static zip: JSZip;

		public constructor() {
		}

		public static loadZip() {
			let data: any = RES.getRes("config_zip");
			this.zip = new JSZip(data);
		}

		public static getRes(key: string): any {
			if (RES.hasRes(key)) {
				return RES.getRes(key);
			}

			if (key.indexOf("json") >= 0) {
				return JSON.parse(this.GetTextData(key));
			}

			if (key.indexOf("dbbin") >= 0 || key.indexOf("png") >= 0 || key.indexOf("bin") >= 0) {
				return this.GetBinaryData(key);
			}
		}

		public static hasRes(key: string): boolean {
			return RES.hasRes(key);
		}

		public static GetTextData(strName: string): string {
			return this.zip.file(strName).asText();
		}

		public static GetBinaryData(strName: string): ArrayBuffer {
			return this.zip.file(strName).asArrayBuffer();
		}

		public static RemoveZipFile(filepath: string): void {
			this.zip.remove(filepath);
		}
	}
}