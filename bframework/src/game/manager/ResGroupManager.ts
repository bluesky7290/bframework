namespace ttaby {
	import Dictionary = core.Dictionary;

	class CompleteFunc extends egret.HashObject {
		public completeFunc: Function;
		public thisObject: any;

		public constructor() {
			super();
		}
	}

	class ResGroupPef extends egret.HashObject {
		public constructor() {
			super();
		}
		public groupName: string = "";
		public pefcount: number = 0;
		public loading: boolean = true;
		public completeFuncs: Array<CompleteFunc> = [];
		public destoryTime: number = 0;
	}

	export class ResGroupManager extends egret.HashObject {
		private static s_instance: ResGroupManager;
		private m_ResGroupPefs: Dictionary<ResGroupPef>;
		private m_DeleteResGroupPefs: Array<ResGroupPef>;

		public constructor() {
			super();
			this.m_ResGroupPefs = new Dictionary<ResGroupPef>();
			this.m_DeleteResGroupPefs = new Array<ResGroupPef>();
			core.TimerManager.instance.addTick(1000, -1, this.checkRes, this);
		}

		public static getInstance(): ResGroupManager {
			if (ResGroupManager.s_instance == null) {
				ResGroupManager.s_instance = new ResGroupManager();
			}
			return ResGroupManager.s_instance;
		}

		private checkRes(): boolean {
			for (let i = 0; i < this.m_ResGroupPefs.length; i++) {
				let groupName = this.m_ResGroupPefs.keys[i];
				let resGroupPef = this.m_ResGroupPefs.get(groupName);
				if (resGroupPef) {
					let currentTime = egret.getTimer();
					let destoryTime = resGroupPef.destoryTime;
					if (destoryTime && currentTime > resGroupPef.destoryTime) {
						if (!resGroupPef.loading) {
							core.ResUtils.destoryGroups([groupName]);
						}
						this.m_ResGroupPefs.remove(groupName);
						Log.log("real destoryGroup pefcount>>>>>>>>>>>>>>>> name = ", groupName, resGroupPef.pefcount);
					}
				}
			}
			return false;
		}
		/**
		 * 加载资源
		 */
		public loadGroup(groupName: string, onComplete: Function, thisObject: any): void {
			let resGroupPef: ResGroupPef = null;
			if (this.m_ResGroupPefs.indexOfKey(groupName) != -1) {
				resGroupPef = this.m_ResGroupPefs.get(groupName);
				resGroupPef.pefcount += 1;
				resGroupPef.destoryTime = 0;
				if (!resGroupPef.loading) {
					if (onComplete) {
						onComplete.call(thisObject);
					}
				} else {
					let completeFunc = new CompleteFunc();
					completeFunc.completeFunc = onComplete;
					completeFunc.thisObject = thisObject;
					resGroupPef.completeFuncs.push(completeFunc);
				}
			} else {
				let completeFunc = new CompleteFunc();
				completeFunc.completeFunc = onComplete;
				completeFunc.thisObject = thisObject;
				//
				resGroupPef = new ResGroupPef();
				resGroupPef.pefcount += 1;
				resGroupPef.groupName = groupName;
				resGroupPef.loading = true;
				resGroupPef.completeFuncs.push(completeFunc);
				this.m_ResGroupPefs.add(groupName, resGroupPef);
				core.ResUtils.loadGroups([groupName], this.onResourceProgress, this.onResourceLoadError, this.onResourceLoadComplete, this);
			}
			Log.log("loadGroup pefcount>>>>>>>>>>>>>>>> name = ", groupName, resGroupPef.pefcount);
		}
		/**
		 * 销毁资源
		 */
		public destoryGroup(groupName: string, onComplete: Function, thisObject: any): void {
			let resGroupPef = this.m_ResGroupPefs.get(groupName);
			if (resGroupPef) {
				resGroupPef.pefcount -= 1;
				if (resGroupPef.pefcount == 0) {
					resGroupPef.completeFuncs.length = 0;
					resGroupPef.destoryTime = egret.getTimer() + 10000;
				} else {
					let completeFuncs = resGroupPef.completeFuncs;
					for (let i = completeFuncs.length - 1; i > 0; i--) {
						let t = completeFuncs[i];
						if (t.thisObject === thisObject && t.completeFunc === onComplete) {
							completeFuncs.splice(i, 1);
							break;
						}
					}
				}
				Log.log("destoryGroup pefcount>>>>>>>>>>>>>>>> name = ", groupName, resGroupPef.pefcount);
			}
		}
		/**
		 * 强制销毁资源
		 */
		public destoryGroupFroce(groupName: string, onComplete?: Function, thisObject?: any): void {
			let resGroupPef = this.m_ResGroupPefs.get(groupName);
			if (resGroupPef) {
				resGroupPef.completeFuncs.length = 0;
				if (!resGroupPef.loading) {
					core.ResUtils.destoryGroups([groupName]);
				}
				this.m_ResGroupPefs.remove(groupName);
				Log.log("destoryGroupFroce pefcount>>>>>>>>>>>>>>>> name = ", groupName, resGroupPef.pefcount);
			}
		}

		private onResourceLoadError(data: core.GroupData): void {

		}

		private onResourceProgress(data: core.GroupData): void {

		}

		private onResourceLoadComplete(data: core.GroupData): void {
			let resGroupPef = this.m_ResGroupPefs.get(data.curGroup.groupName);
			if (resGroupPef) {
				resGroupPef.loading = false;
				let completeFuncs = resGroupPef.completeFuncs;
				while (completeFuncs.length > 0) {
					let completeFunc = completeFuncs.shift();
					if (completeFunc) {
						completeFunc.completeFunc.call(completeFunc.thisObject);
					}
				}
			} else {
				core.ResUtils.destoryGroups([data.curGroup.groupName]);
			}
		}
	}
}