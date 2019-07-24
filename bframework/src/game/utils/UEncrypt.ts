// import JSEncrypt from "./jsencrypt/JSEncrypt";
import StringBuffer = core.StringBuffer;
import MathUtils = core.MathUtils;

namespace ttaby {
	export class UEncrypt {
		public constructor() {
		}

		private static constant: Array<string> =
		[
			//'0','1','2','3','4','5','6','7','8','9',
			'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
			'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
		];

		public static GenerateRandom(Length: number): string {
			let newRandom: StringBuffer = new StringBuffer();
			for (let i = 0; i < Length; i++) {
				newRandom.append(this.constant[MathUtils.randomInt(0, 53)]);
			}
			return newRandom.toString();
		}

		/**
		 * 用RSA公钥 加密
		 */
		public static RSAEncrypt(key: string): any {
			let publicKey: string = `MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArCeD/Ri7awEwq7m0ZEQY
									j9CdR9zC4o7ht3dIuAFHUW/yyxpBw51Fw6ec+qwdoTqW5p1/Ar+m0vjb2HsuHq5M
									MnRjjTajKrruhATQwNM8tUEEn1JWquzclJidvyCITQ+8K/6bEqJaB4Drj0HA8ptX
									k0bOjMF+dfve8efcykBEXzGfywTddIZy/QgloZiGY/S+ne2bJboo/kjVYoA8blU4
									z0NyldTf9dRBCzRhL/gSA+Gh+XPBLD5vdo8HalFsmbABbQpQHX69CxccB5a/QwMy
									vsdMmeEXrZ0p4RfXH+S2ZHSnGaVr7MONCoGtbrWril5wWWLE2SQapM5M4J5CJ15C
									RwIDAQAB`;
			let rsa = new JSEncrypt();
			rsa.setPublicKey(publicKey);
			return rsa.encrypt(key);
		}
		/**
		 * 用RSA私钥 解密
		 */
		public static RSADecrypt(data: any, privateKey: string): any {
			let rsa = new JSEncrypt();
			rsa.setPrivateKey(privateKey);
			return rsa.decrypt(data);
		}
		/**
		 * DES加密
		 */
		public static DESEncrypt(data, key): any {
			let keyHex = CryptoJS.enc.Utf8.parse(key);
			let encrypted = CryptoJS.DES.encrypt(data, keyHex, {
				mode: CryptoJS.mode.ECB,
				padding: CryptoJS.pad.Pkcs7
			});
			return encrypted.toString();
		}
		/**
		 * DES解密
		 */
		public static DESDecrypt(data, key): any {
			let keyHex = CryptoJS.enc.Utf8.parse(key);
			let decrypted = CryptoJS.DES.decrypt(data, keyHex, {
				mode: CryptoJS.mode.ECB,
				padding: CryptoJS.pad.Pkcs7
			})
			return decrypted.toString(CryptoJS.enc.Utf8)
		}
	}
}