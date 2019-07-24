module core {
	/**
	 * 数组工具类
	 */
	export class ArrayUtils {
		public constructor() {
		}
		/**
         * 从数组移除符合条件的元素，此方法会修改原数组
         * @param  {T[]} array  数组
         * @param  {(item1:T)=>boolean} condition  判定条件
         * @return T[]  被移除元素的数组，当无元素移除时返回为null
         */
		public static remove<T>(array: T[], condition: (item1: T) => boolean): T[] {
			let result: T[] = null;
			if (array) {
				for (let i: number = array.length - 1; i >= 0; i--) {
					if (condition(array[i])) {
						if (result) {
							result = result.concat(array.splice(i, 1));
						} else {
							result = array.splice(i, 1);
						}
					}
				}
			}
			return result;
		}
		/**
		 * 从数组搜索符合条件的元素，此方法会创建新数组
		 * @param  {T[]} array	数组
		 * @param  {(item1:T)=>boolean} condition	判定条件
		 * @returns T[] 符合条件元素组成的新数组，当无元素匹配时返回为null
		 */
		public static search<T>(array: T[], condition: (item1: T) => boolean): T[] {
			let result: T[] = null;
			if (array) {
				for (let i: number = array.length - 1; i >= 0; i--) {
					if (condition(array[i])) {
						if (result) {
							result.push(array[i]);
						} else {
							result = [array[i]];
						}
					}
				}
			}
			return result;
		}
		/**
		 * 数组遍历
		 * @param arr
		 * @param func
		 */
		public static forEach(arr: Array<any>, func: Function, funcObj: any): void {
			for (var i: number = 0, len: number = arr.length; i < len; i++) {
				func.apply(funcObj, [arr[i]]);
			}
		}
		/**
		 * 清空数组
		 */
		public static clear<T>(array: T[]): void {
			while (array.length > 0) {
				array.pop();
			}
		}
		/**
		 * 排序
		 */
		public static sort<T>(array: T[], rule_list: Array<any>): void {
			function sort_func(first_info: T, second_info: T) {
				for (let i = 0; i < rule_list.length; i++) {
					let v = rule_list[i];
					if (first_info[v.key] < second_info[v.key]) {
						if (v.revert) {
							return 1;
						} else {
							return -1;
						}
					}

					if (first_info[v.key] > second_info[v.key]) {
						if (v.revert) {
							return -1;
						} else {
							return 1;
						}
					}
				}

				return 0;
			}
			array.sort(sort_func);
		}
	}
}