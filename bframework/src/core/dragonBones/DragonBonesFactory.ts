namespace core {
    class DragonBonesPef {
        public dbname: string;
        public dbpefcount: number;
        public destoryTime: number;
    }

    import Dictionary = core.Dictionary;
    /**
     * DragonBones工厂类
     */
    export class DragonBonesFactory {
        private static s_instance: DragonBonesFactory;
        private averageUtils: AverageUtils;
        private factory: dragonBones.EgretFactory;
        private isPlay: boolean;
        private clocks: Array<dragonBones.WorldClock>;
        private clocksLen: number;
        private files: Array<string>;
        private dbPefs: Dictionary<DragonBonesPef>;

        /**
         * 构造函数
         */
        public constructor() {
            this.averageUtils = new AverageUtils();
            this.factory = new dragonBones.EgretFactory();
            this.clocks = new Array<dragonBones.WorldClock>();
            this.clocksLen = 0;
            this.files = [];
            this.dbPefs = new Dictionary<DragonBonesPef>();
            core.TimerManager.instance.addTick(1000, -1, this.checkRes, this);
            //默认开启
            this.start();
        }
        /**
         * 检查过期资源并且删除
         */
        private checkRes(): boolean {
            for (let i = this.dbPefs.length - 1; i >= 0; i--) {
                let name = this.dbPefs.keys[i];
                let dbpef = this.dbPefs.get(name);
                if (dbpef) {
                    let currentTime = egret.getTimer();
                    let destoryTime = dbpef.destoryTime;
                    if (destoryTime && currentTime > dbpef.destoryTime) {
                        this.removeSkeletonData(name);
                        this.removeTextureAtlas(name);
                        this.dbPefs.remove(name);
                        Log.log("real remove dbpefcount>>>>>>>>>>>>>>>> name = ", name, dbpef.dbpefcount);
                    }
                }
            }
            return false;
        }
        /**
         * 初始化一个动画文件
         * @param skeletonData 动画描述文件
         * @param texture 动画资源
         * @param textureData 动画资源描述文件
         */
        public initArmatureFile(skeletonData: any, texture: egret.Texture, textureData: any): void {
            if (this.files.indexOf(skeletonData.name) != -1) {
                return;
            }
            this.addSkeletonData(skeletonData);
            this.addTextureAtlas(texture, textureData);
            this.files.push(skeletonData.name);
        }

        /**
         * 初始化一个动画文件
         * @param name 动画文件名前缀
         */
        public initArmatureName(name: string, count?: number): void {
            if (this.dbPefs.indexOfKey(name) < 0) {
                if (count) {
                    let ske = name + "_ske_dbbin";
                    this.addSkeletonData(ttaby.ResManager.getRes(ske));
                    for (let i = 0; i < count; i++) {
                        let texpng = name + "_tex_" + i.toString() + "_png";
                        let texjson = name + "_tex_" + i.toString() + "_json";
                        this.addTextureAtlas(ttaby.ResManager.getRes(texpng), ttaby.ResManager.getRes(texjson));
                    }
                } else {
                    let ske = name + "_ske_dbbin";
                    let texpng = name + "_tex_png";
                    let texjson = name + "_tex_json";
                    this.addSkeletonData(ttaby.ResManager.getRes(ske));
                    this.addTextureAtlas(ttaby.ResManager.getRes(texpng), ttaby.ResManager.getRes(texjson));
                }
                let dbpef = new DragonBonesPef();
                dbpef.dbname = name;
                dbpef.dbpefcount = 1;
                dbpef.destoryTime = 0;
                this.dbPefs.add(name, dbpef);
            } else {
                let dbpef = this.dbPefs.get(name);
                dbpef.dbpefcount += 1;
                dbpef.destoryTime = 0;
                Log.log("removeArmatureName dbpef>>>>>>>>>>>>>>>> name = ", name, dbpef.dbpefcount);
            }
        }

        public hasArmatureName(name: string): boolean {
            var index: number = this.dbPefs.indexOfKey(name);
            if (index != -1) {
                return true;
            }
            return false;
        }

        /**
         * 移除动画文件
         * @param name
         */
        public removeArmatureFile(name: string): void {
            var index: number = this.files.indexOf(name);
            if (index != -1) {
                this.removeSkeletonData(name);
                this.removeTextureAtlas(name);
                this.files.splice(index, 1);
            }
        }

        /**
         * 移除动画文件
         * @param name
         */
        public removeArmatureName(name: string): void {
            var index: number = this.dbPefs.indexOfKey(name);
            if (index != -1) {
                let dbpef = this.dbPefs.get(name);
                dbpef.dbpefcount -= 1;
                if (dbpef.dbpefcount <= 0) {
                    dbpef.destoryTime = egret.getTimer() + 10000;
                }
                Log.log("removeArmatureName dbpef>>>>>>>>>>>>>>>> name = ", name, dbpef.dbpefcount);
            }
        }

        /**
         * 直接移除动画文件，马上释放内存
         * @param name
         */
        public removeArmatureNameFroce(name: string): void {
            var index: number = this.dbPefs.indexOfKey(name);
            if (index != -1) {
                let dbpef = this.dbPefs.get(name);
                this.removeSkeletonData(name);
                this.removeTextureAtlas(name);
                this.dbPefs.remove(name);
                Log.log("removeArmatureName dbpef>>>>>>>>>>>>>>>> name = ", name, dbpef.dbpefcount);
            }
        }

        /**
         * 清空所有动画
         */
        public clear(): void {
            while (this.files.length) {
                this.removeArmatureFile(this.files[0]);
            }
        }

        /**
         * 添加动画描述文件
         * @param skeletonData
         */
        public addSkeletonData(skeletonData: any): void {
            this.factory.parseDragonBonesData(skeletonData);
        }

        /**
         * 添加动画所需资源
         * @param texture 动画资源
         * @param textureData 动画资源描述文件
         */
        public addTextureAtlas(texture: egret.Texture, textureData: any): void {
            this.factory.parseTextureAtlasData(textureData, texture);
        }

        /**
         * 移除动画描述文件
         * @param skeletonData
         */
        public removeSkeletonData(name: string): void {
            this.factory.removeDragonBonesData(name);
        }

        /**
         * 移除动画所需资源
         * @param texture 动画资源
         * @param textureData 动画资源描述文件
         */
        public removeTextureAtlas(name: string): void {
            this.factory.removeTextureAtlasData(name);
        }

        /**
         * 创建一个动画
         * @param name 动作名称
         * @param fromDragonBonesDataName 动画文件名称
         * @returns {Armature}
         */
        public makeArmature(name: string, fromDragonBonesDataName?: string, playSpeed: number = 1): DragonBonesArmature {
            var armature: dragonBones.Armature = this.factory.buildArmature(name, fromDragonBonesDataName);
            if (armature == null) {
                console.warn("不存在Armature： " + name);
                return null;
            }
            var clock: dragonBones.WorldClock = this.createWorldClock(playSpeed);
            var result: DragonBonesArmature = new DragonBonesArmature(armature, clock);
            return result;
        }

        /**
         * 创建一个动画（急速模式）
         * @param name 动作名称
         * @param fromDragonBonesDataName 动画文件名称
         * @returns {Armature}
         */
        public makeFastArmature(name: string, fromDragonBonesDataName?: string, playSpeed: number = 1): DragonBonesArmature {
            var result: DragonBonesArmature = this.makeArmature(name, fromDragonBonesDataName, playSpeed);
            result.getArmature().cacheFrameRate = 24;
            return result;
        }

        /**
         * 创建WorldClock
         * @param playSpeed
         * @returns {dragonBones.WorldClock}
         */
        private createWorldClock(playSpeed: number): dragonBones.WorldClock {
            for (var i: number = 0; i < this.clocksLen; i++) {
                if (this.clocks[i].timeScale == playSpeed) {
                    return this.clocks[i];
                }
            }
            var newClock: dragonBones.WorldClock = new dragonBones.WorldClock();
            newClock.timeScale = playSpeed;
            this.clocks.push(newClock);
            this.clocksLen = this.clocks.length;
            return newClock;
        }

        /**
         * dragonBones体系的每帧刷新
         * @param advancedTime
         */
        private onEnterFrame(advancedTime: number): boolean {
            this.averageUtils.push(advancedTime);
            var time: number = this.averageUtils.getValue() * 0.001;
            for (var i: number = 0; i < this.clocksLen; i++) {
                var clock: dragonBones.WorldClock = this.clocks[i];
                clock.advanceTime(time);
            }
            return false;
        }

        /**
         * 停止
         */
        public stop(): void {
            if (this.isPlay) {
                FrameEventCenter.getInstance().removeFrameEventListener(this.onEnterFrame, this);
                this.isPlay = false;
            }
        }

        /**
         * 开启
         */
        public start(): void {
            if (!this.isPlay) {
                this.isPlay = true;
                FrameEventCenter.getInstance().addFrameEventListener(this.onEnterFrame, this);
            }
        }

        public static get instance(): DragonBonesFactory {
            if (DragonBonesFactory.s_instance == null) {
                DragonBonesFactory.s_instance = new DragonBonesFactory();
            }
            return DragonBonesFactory.s_instance;
        }
    }
}