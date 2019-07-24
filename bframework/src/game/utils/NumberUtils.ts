namespace ttaby {
	export class NumberUtils {
		public constructor() {
		}
		/**
		 * 万字的显示
		 * @param label
		 * @param num
		 */
		public static overLenght(num): string {
			var str = null;
			if (num < 100000) {
				str = num;
			}
			else if (num < 1000000) {
				str = Math.floor(num / 1000 / 10).toString() + "万";
			}
			else {
				str = Math.floor(num / 10000).toString() + "万";
			}
			return str;
		}
		// public static toNonExponential(num) {
		// 	let m = num.toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/);
		// 	return num.toFixed(Math.max(0, (m[1] || '').length - m[2]));
		// }
		/**
		 * 格式化数字 999,999,999,999,999
		 */
		public static toThousands(n: number): string {
			// let nm = this.toNonExponential(n);
			let num = (n || 0).toString(), result = '';
			while (num.length > 3) {
				result = ',' + num.slice(-3) + result;
				num = num.slice(0, num.length - 3);
			}
			if (num) { result = num + result; }
			return result;
		}
	}
}