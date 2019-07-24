module core {
	export class StringUtils {
		/**
		 * 构造函数
		 */
		public constructor() {
		}
		/**
		 * 去掉前后空格
		 * @param str
		 * @returns {string}
		 */
		public static trimSpace(str: string): string {
			return str.replace(/^\s*(.*?)[\s\n]*$/g, '$1');
		}
		/**
		 * 获取字符串长度，中文为2
		 * @param str
		 */
		public static getStringLength(str: string): number {
			var strArr = str.split("");
			var length = 0;
			for (var i = 0; i < strArr.length; i++) {
				var s = strArr[i];
				if (this.isChinese(s)) {
					length += 2;
				} else {
					length += 1;
				}
			}
			return length;
		}
		/**
		 * 判断一个字符串是否包含中文
		 * @param str
		 * @returns {boolean}
		 */
		public static isChinese(str: string): boolean {
			var reg = /^.*[\u4E00-\u9FA5]+.*$/;
			return reg.test(str);
		}

		/**
		 * 数字转换为12:00时间格式
		 */
		public static formatTime(time: number): string {
			let hour: number = Math.floor(time / 3600);
			let min: number = Math.floor(time / 60) % 60;
			let sec: number = Math.floor(time % 60);
			let hourstr: string = hour < 10 ? "0" + hour : hour + "";
			let minstr: string = min < 10 ? "0" + min : min + "";
			let secstr: string = sec < 10 ? "0" + sec : sec + "";
			if (hour > 0) {
				return this.format("{0}:{1}:{2}", [hourstr, minstr, secstr]);
			} else {
				return this.format("{0}:{1}", [minstr, secstr]);
			}
		}
		/**
		 * 格式化字符串 "{0},{1}.format("text0","text1")
		 */
		public static format(content: string, args: Array<any>): string {
			for (var i: number = 0; i < args.length; i++) {
				var regexp = new RegExp('\\{' + i + '\\}', 'gi');
				content = content.replace(regexp, args[i]);
			}
			return content;
		}

		/**
		 * 如果str的长度超过len，就取前len个字符在加上后缀suffix
		 */
		public static formatString(str: string, len: number, suffix: string): string {
			if (str.length > len) {
				str = str.slice(0, len) + suffix;
			}
			return str;
		}
		/**
		 * 格式化数字 99999=> 99,999
		 */
		public static formatNumber(num: number): string {
			var sign: boolean = (num == Math.abs(num));
			num = Math.abs(num);
			var str: string = num.toString();
			if (str.indexOf(".") > -1 && str.split(".")[1].length > 2) {
				var index: number = str.indexOf(".");
				str = str.substring(0, index + 3);
			}

			var value: string = str.replace(/(^|\s)\d+/g, function (m) {
				return m.replace(/(?=(?!\b)(\d{3})+$)/g, ',');
			});

			return sign ? value : "-" + value;
		}

		/**
		 * 格式化数字 99999=>9万
		 */
		public static formatNumber2(num: number): string {
			if (num < 10000) {
				return num.toString();
			}
			num = Math.floor(num / 10000);
			return num + "万";
		}

		/**
		 * 深度复制json格式数据
		 */
		public static deepCode(obj: any): any {
			var temp = JSON.parse(JSON.stringify(obj));//先将obj转换为JSON字符串，然后再转回对象
			return temp;
		}

		/**
		 * 深度复制
		 * @param _data
		 */
		public static DeepCopy(obj) {
			var newObj;
			if (obj instanceof Array) {
				newObj = [];
			}
			else if (obj instanceof Object) {
				newObj = {};
			}
			else {
				return obj;
			}
			var keys = Object.keys(obj);
			for (var i = 0, len = keys.length; i < len; i++) {
				var key = keys[i];
				newObj[key] = this.DeepCopy(obj[key]);
			}
			return newObj;
		}
		/**
		 * 对象拷贝
		 */
		public static CopyTo(src, des) {
			var keys = Object.keys(src);
			for (let key of keys) {
				des[key] = this.DeepCopy(src[key])
			}
		}
	}
}