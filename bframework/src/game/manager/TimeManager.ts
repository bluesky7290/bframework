namespace ttaby {
	export class TimeManager {
		public static currentTime = new Date().getTime();
		public static localTime = new Date().getTime();
		public static netDelay = 0;

		// 设置延迟时长
		public static SetDelay(serverTime, delay) {
			this.netDelay = delay;
			this.SetCurrentTime(serverTime);
		}

		// 设置当前同步后的时间
		public static SetCurrentTime(serverTime) {
			this.localTime = new Date().getTime() / 1000;
			this.currentTime = serverTime + this.netDelay;
		}

		// 获取当前同步后的时间秒
		public static GetCurrentTime(): number {
			this.currentTime = this.currentTime + new Date().getTime() / 1000 - this.localTime;
			this.localTime = new Date().getTime() / 1000;
			return this.currentTime;
		}

		public static GetRemainTime(endTime) {
			return endTime - this.GetCurrentTime();
		}

		/**
		 * 获取两段时间的时间差
		 */
		public static Timediff(long_time: number, short_time: number): any {
			let date1 = new Date(long_time*1000);
			let date2 = new Date(short_time*1000);
			let years: number = date1.getFullYear() - date2.getFullYear();
			let months: number = date1.getMonth() - date2.getMonth();
			let days: number = date1.getDate() - date2.getDate();
			let hours: number = date1.getHours() - date2.getHours();
			let mins: number = date1.getMinutes() - date2.getMinutes();
			let secs: number = date1.getSeconds() - date2.getSeconds();
			return { "year": years, "month": months, "day": days, "hour": hours, "min": mins, "sec": secs };
		}
	}
}