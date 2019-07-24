namespace ttaby {
	class DBFileCache extends egret.HashObject {
		public dbFiles: DBFile[];
		public groupName: string;
		public thisResObject: any;
		public onResComplete: Function;
		public thisObject: any;
		public onComplete: Function;

		public constructor() {
			super();
		}
	}

	export class DBFile extends egret.HashObject {
		public dbFileName: string;
		public texCount?: number;

		public constructor(dbFileName: string, texCount?: number) {
			super();
			this.dbFileName = dbFileName;
			this.texCount = texCount;
		}
	}

	/**
	 * 资源组缓存管理，包括龙骨数据初始化
	 */
	export class DragonBonesCacheManager {
		private static s_instance: DragonBonesCacheManager;

		private m_DBcache = new core.Dictionary<Array<DBFileCache>>();

		public constructor() {
		}

		public static get instance(): DragonBonesCacheManager {
			if (!DragonBonesCacheManager.s_instance) {
				DragonBonesCacheManager.s_instance = new DragonBonesCacheManager();
			}
			return DragonBonesCacheManager.s_instance;
		}

		/**
		 * 根据资源名称获取龙骨动画
		 * @param dbFileName db文件名
		 * @param groupName 资源所在组名
		 * @param onComplete 初始化完回调函数
		 * @param thisObject 回调函数所在域
		 * @param texCount 纹理数量
		 * 注意:db文件必须导出二进制数据
		 */
		public InitDBWithName(groupName: string, dbFile: DBFile, onComplete: Function, thisObject: any, texCount?: number): void {
			let func = function () {
				let dbFileName = dbFile.dbFileName;
				let texCount = dbFile.texCount;
				core.DragonBonesFactory.instance.initArmatureName(dbFileName, texCount);

				if (onComplete) {
					onComplete.call(thisObject);
				}
			};

			let dbCache = new DBFileCache();
			dbCache.dbFiles = [dbFile];
			dbCache.groupName = groupName;
			dbCache.thisResObject = this;
			dbCache.onResComplete = func;
			dbCache.thisObject = thisObject;
			dbCache.onComplete = onComplete;
			if (this.m_DBcache.indexOfKey(groupName) < 0) {
				this.m_DBcache.add(groupName, [dbCache]);
			} else {
				this.m_DBcache.get(groupName).push(dbCache);
			}
			ResGroupManager.getInstance().loadGroup(groupName, func, this);
		}
		/**
		 * 根据资源名称获取龙骨动画
		 * @param dbFileName db文件名
		 * @param groupName 资源所在组名
		 * @param onComplete 初始化完回调函数
		 * @param thisObject 回调函数所在域
		 * @param texCount 纹理数量
		 * 注意:db文件必须导出二进制数据
		 */
		public InitDBWithNames(groupName: string, dbFiles: DBFile[], onComplete: Function, thisObject: any, texCount?: number): void {
			let func = function () {
				for (let i = 0; i < dbFiles.length; i++) {
					let dbFileName = dbFiles[i].dbFileName;
					let texCount = dbFiles[i].texCount;
					core.DragonBonesFactory.instance.initArmatureName(dbFileName, texCount);
				}

				if (onComplete) {
					onComplete.call(thisObject);
				}
			};

			let dbCache = new DBFileCache();
			dbCache.dbFiles = dbFiles;
			dbCache.groupName = groupName;
			dbCache.thisResObject = this;
			dbCache.onResComplete = func;
			dbCache.thisObject = thisObject;
			dbCache.onComplete = onComplete;
			if (this.m_DBcache.indexOfKey(groupName) < 0) {
				this.m_DBcache.add(groupName, [dbCache]);
			} else {
				this.m_DBcache.get(groupName).push(dbCache);
			}
			ResGroupManager.getInstance().loadGroup(groupName, func, this);
		}
		/**
		 * 销毁db
		 */
		public ReleaseDBFile(groupName: string, thisObject: any): void {
			let dbCaches: Array<DBFileCache> = this.m_DBcache.get(groupName);
			for (let i = dbCaches.length - 1; i >= 0; i--) {
				let dbc = dbCaches[i];
				if (dbc.thisObject == thisObject) {
					let dbFiles = dbc.dbFiles;
					for (let i = 0; i < dbFiles.length; i++) {
						let dbFileName = dbFiles[i].dbFileName;
						core.DragonBonesFactory.instance.removeArmatureName(dbFileName);
					}
					ResGroupManager.getInstance().destoryGroup(dbc.groupName, dbc.onResComplete, dbc.thisResObject);
					dbCaches.splice(i, 1);
				}
			}

			if (dbCaches.length == 0) {
				this.m_DBcache.remove(groupName);
			}
		}
		/**
		 * 销毁db
		 */
		public ReleaseDBFileWithFunc(groupName: string, onComplete: Function, thisObject: any): void {
			let dbCaches: Array<DBFileCache> = this.m_DBcache.get(groupName);
			for (let i = dbCaches.length - 1; i >= 0; i--) {
				let dbc = dbCaches[i];
				if (dbc.thisObject === thisObject && dbc.onComplete === onComplete) {
					let dbFiles = dbc.dbFiles;
					for (let i = 0; i < dbFiles.length; i++) {
						let dbFileName = dbFiles[i].dbFileName;
						core.DragonBonesFactory.instance.removeArmatureName(dbFileName);
					}
					ResGroupManager.getInstance().destoryGroup(dbc.groupName, dbc.onResComplete, dbc.thisResObject);
					dbCaches.splice(i, 1);
				}
			}

			if (dbCaches.length == 0) {
				this.m_DBcache.remove(groupName);
			}
		}
		/**
		 * 销毁db
		 */
		public ReleaseDBFiles(thisObject: any): void {
			for (let i = this.m_DBcache.length - 1; i >= 0; i--) {
				let groupName = this.m_DBcache.keys[i];
				let dbCaches = this.m_DBcache.get(groupName);
				for (let j = dbCaches.length - 1; j >= 0; j--) {
					let dbc = dbCaches[j];
					if (dbc.thisObject == thisObject) {
						let dbFiles = dbc.dbFiles;
						for (let i = 0; i < dbFiles.length; i++) {
							let dbFileName = dbFiles[i].dbFileName;
							core.DragonBonesFactory.instance.removeArmatureName(dbFileName);
						}
						ResGroupManager.getInstance().destoryGroup(dbc.groupName, dbc.onResComplete, dbc.thisResObject);
						dbCaches.splice(j, 1);
					}
				}

				if (dbCaches.length == 0) {
					this.m_DBcache.remove(groupName);
				}
			}
		}
		/**
		 * 直接销毁
		 */
		public ReleaseDBFileFroce(groupName: string, thisObject: any): void {
			let dbCaches: Array<DBFileCache> = this.m_DBcache.get(groupName);
			for (let i = dbCaches.length - 1; i >= 0; i--) {
				let dbc = dbCaches[i];
				if (dbc.thisObject == thisObject) {
					let dbFiles = dbc.dbFiles;
					for (let i = 0; i < dbFiles.length; i++) {
						let dbFileName = dbFiles[i].dbFileName;
						core.DragonBonesFactory.instance.removeArmatureNameFroce(dbFileName);
					}
					ResGroupManager.getInstance().destoryGroupFroce(dbc.groupName, dbc.onResComplete, dbc.thisResObject);
					dbCaches.splice(i, 1);
				}
			}

			if (dbCaches.length == 0) {
				this.m_DBcache.remove(groupName);
			}
		}
		/**
		 * 直接销毁
		 */
		public ReleaseDBFileWithFuncFroce(groupName: string, onComplete: Function, thisObject: any): void {
			let dbCaches: Array<DBFileCache> = this.m_DBcache.get(groupName);
			for (let i = dbCaches.length - 1; i >= 0; i--) {
				let dbc = dbCaches[i];
				if (dbc.thisObject === thisObject && dbc.onComplete === onComplete) {
					let dbFiles = dbc.dbFiles;
					for (let i = 0; i < dbFiles.length; i++) {
						let dbFileName = dbFiles[i].dbFileName;
						core.DragonBonesFactory.instance.removeArmatureNameFroce(dbFileName);
					}
					ResGroupManager.getInstance().destoryGroupFroce(dbc.groupName, dbc.onResComplete, dbc.thisResObject);
					dbCaches.splice(i, 1);
				}
			}

			if (dbCaches.length == 0) {
				this.m_DBcache.remove(groupName);
			}
		}
		/**
		 * 直接销毁
		 */
		public ReleaseDBFilesFroce(thisObject: any): void {
			for (let i = this.m_DBcache.length - 1; i >= 0; i--) {
				let groupName = this.m_DBcache.keys[i];
				let dbCaches = this.m_DBcache.get(groupName);
				for (let j = dbCaches.length - 1; j >= 0; j--) {
					let dbc = dbCaches[j];
					if (dbc.thisObject == thisObject) {
						let dbFiles = dbc.dbFiles;
						for (let i = 0; i < dbFiles.length; i++) {
							let dbFileName = dbFiles[i].dbFileName;
							core.DragonBonesFactory.instance.removeArmatureNameFroce(dbFileName);
						}
						ResGroupManager.getInstance().destoryGroupFroce(dbc.groupName, dbc.onResComplete, dbc.thisResObject);
						dbCaches.splice(j, 1);
					}
				}

				if (dbCaches.length == 0) {
					this.m_DBcache.remove(groupName);
				}
			}
		}
	}
}