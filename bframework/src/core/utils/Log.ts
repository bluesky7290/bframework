module core {
	/**
	 * 日志级别
	 */
	export class Logger {
		public static ALL: string = "ALL";
		public static DEBUG: string = "DEBUG";
		public static ERROR: string = "ERROR";
		public static INFO: string = "INFO";
		public static OFF: string = "OFF";
		public static WARN: string = "WARN";
	}
	/**
	 * 日志类
	 */
	export class Log {
		private static s_logLevel: Logger = Logger.ALL;
		private static m_logFunc: Function;
		private static m_errorFunc: Function;
		private static m_infoFunc: Function;
		private static m_warnFunc: Function;

		public constructor() {
		}
		/**
		 * 设置输出日志级别
		 */
		public static set logLevel(logType: string) {
			Log.s_logLevel = logType;
			switch (logType) {
				case Logger.ALL:
					Log.m_logFunc = console.log;
					Log.m_errorFunc = console.error;
					Log.m_infoFunc = console.info;
					Log.m_warnFunc = console.warn;
					break;
				case Logger.DEBUG:
					Log.m_logFunc = console.log;
					Log.m_infoFunc = console.info;
					Log.m_warnFunc = console.warn;
					break;
				case Logger.ERROR:
					Log.m_logFunc = console.log;
					Log.m_errorFunc = console.error;
					Log.m_infoFunc = console.info;
					Log.m_warnFunc = console.warn;
					break;
				case Logger.INFO:
					Log.m_infoFunc = console.info;
					break;
				case Logger.OFF:
					Log.m_logFunc = null;
					Log.m_errorFunc = null;
					Log.m_infoFunc = null;
					Log.m_warnFunc = null;
					break;
				case Logger.WARN:
					Log.m_infoFunc = console.info;
					Log.m_warnFunc = console.warn;
					break;
				default:
					break;
			}
		}
		/**
		 * Debug
		 */
		public static log(...optionalParams): void {
			if (Log.m_logFunc) {
				// 打印调用堆栈
				// this.printCallStack();
				// console.trace();
				let message = "[Debug]" + DateUtils.dateFormat("yyyy-MM-dd hh:mm:ss", new Date().getTime() / 1000);
				Log.m_logFunc.call(this, message, ...optionalParams);
			}
		}

		/**
		 * Info
		 */
		public static info(...optionalParams): void {
			if (Log.m_infoFunc) {
				let message = "[Info]" + DateUtils.dateFormat("yyyy-MM-dd hh:mm:ss", new Date().getTime() / 1000);
				Log.m_infoFunc.call(this, message, ...optionalParams);
			}
		}

		/**
		 * Warn
		 */
		public static warn(...optionalParams): void {
			if (Log.m_warnFunc) {
				// console.trace();
				let message = "[Warn]" + DateUtils.dateFormat("yyyy-MM-dd hh:mm:ss", new Date().getTime() / 1000);
				Log.m_warnFunc.call(this, message, ...optionalParams);
			}
		}

		/**
		 * Error
		 */
		public static error(...optionalParams): void {
			if (Log.m_errorFunc) {
				// console.trace();
				let message = "[Error]" + DateUtils.dateFormat("yyyy-MM-dd hh:mm:ss", new Date().getTime() / 1000);
				Log.m_errorFunc.call(this, message, ...optionalParams);
			}
		}
		/**
		 * printCallStack
		 */
		public static printCallStack(count?: number): void {
			var caller = arguments.callee.caller;
			var i = 0;
			count = count || 10;
			console.log("***---------------------------------------- ** " + (i + 1));
			while (caller && i < count) {
				console.log(caller.toString());
				caller = caller.caller;
				i++;
				console.log("***---------------------------------------- ** " + (i + 1));
			}
		}
	}
}