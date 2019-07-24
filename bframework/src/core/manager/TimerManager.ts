namespace core {
    /**
     * 定时器管理器
     * 本类为setTimeout及setInterval和Timer的替代实现，主要是方便程序中Timer事件的生命周期管理，使用起来更为便利。
     * 程序中如用到setTimeout，setInterval及Timer的地方应尽量选择此方案。
     */
    export class TimerManager {
        private static s_instance: TimerManager;
        private _handlers: Array<TimerHandler>;
        private _delHandlers: Array<TimerHandler>;
        private _currTime: number;
        private _currFrame: number;
        private _count: number;
        private _timeScale: number;
        private _isPause: boolean;
        private _pauseTime: number;

        /**
         * 构造函数
         */
        public constructor() {
            this._handlers = new Array<TimerHandler>();
            this._delHandlers = new Array<TimerHandler>();
            this._currTime = egret.getTimer();
            this._currFrame = 0;
            this._count = 0;
            this._timeScale = 1;

            core.EventManager.getInstance().addEventListener(ttaby.CustomEventID.GAMERESUME, this.OnResume, this);
            core.EventManager.getInstance().addEventListener(ttaby.CustomEventID.GAMEPAUSE, this.OnPause, this);
            egret.startTick(this.onTick, this);
        }

        /**
         * 游戏从后台恢复
         */
        private OnResume(): void {
            this.resume();
        }
		/**
		 * 游戏进入后台
		 */
        private OnPause(): void {
            this.pause();
        }

        /**
         * 设置时间参数
         * @param timeScale
         */
        public setTimeScale(timeScale: number): void {
            this._timeScale = timeScale;
        }

        /**
         * 每帧执行函数
         * @param frameTime
         */
        private onTick(timeStamp: number): boolean {
            if (this._isPause) {
                return;
            }
            this._currFrame++;
            this._currTime = egret.getTimer();
            while (this._delHandlers.length) {
                this.removeHandle(this._delHandlers.pop());
            }
            for (var i: number = 0; i < this._count; i++) {
                var handler: TimerHandler = this._handlers[i];
                if (this._delHandlers.indexOf(handler) != -1) {
                    continue;
                }
                var t: number = handler.userFrame ? this._currFrame : this._currTime;
                if (t >= handler.exeTime) {
                    let t1: number = egret.getTimer();
                    let ret = handler.method.call(handler.methodObj, (this._currTime - handler.dealTime) * this._timeScale, handler.methodParams);
                    let t2: number = egret.getTimer();
                    handler.dealTime = this._currTime;
                    handler.exeTime += handler.delay;
                    if (!handler.repeat) {
                        if (handler.repeatCount > 1) {
                            handler.repeatCount--;
                        } else {
                            if (handler.complateMethod) {
                                handler.complateMethod.apply(handler.complateMethodObj, handler.complateMethodParams);
                            }
                            if (this._delHandlers.indexOf(handler) == -1) {
                                this._delHandlers.push(handler);
                            }
                        }
                    }
                    if (t2 - t1 > 2) {
                        Log.error(`tick回调耗时:${t2 - t1}`);
                    }
                    if (ret) {
                        this.removeTick(handler.method, handler.methodObj);
                    }
                }
            }
            return false;
        }

        private removeHandle(handler: TimerHandler): void {
            var i = this._handlers.indexOf(handler);
            if (i == -1) {
                Log.warn("what????");
                return;
            }
            this._handlers.splice(i, 1);
            ObjectPool.push(handler);
            this._count--;
        }

        private create(useFrame: boolean, delay: number, repeatCount: number, method: Function, methodObj: any, methodParams: any, complateMethod: Function, complateMethodObj: any, complateMethodParams: any): void {
            //参数监测
            if (delay < 0 || method == null) {
                return;
            }

            //先删除相同函数的计时
            this.removeTick(method, methodObj);

            //创建
            var handler: TimerHandler = ObjectPool.pop("core.TimerHandler");
            handler.userFrame = useFrame;
            handler.repeat = repeatCount <= 0;
            handler.repeatCount = repeatCount <= 0 ? Number.MAX_VALUE : repeatCount;
            handler.delay = delay;
            handler.method = method;
            handler.methodObj = methodObj;
            handler.methodParams = methodParams;
            handler.complateMethod = complateMethod;
            handler.complateMethodObj = complateMethodObj;
            handler.complateMethodParams = complateMethodParams;
            handler.exeTime = delay + (useFrame ? this._currFrame : this._currTime);
            handler.dealTime = this._currTime;
            this._handlers.push(handler);
            this._count++;
        }

        /**
         * 在指定的延迟（以毫秒为单位）后运行指定的函数。
         * @param delay 执行间隔:毫秒
         * @param method 执行函数
         * @param methodObj 执行函数所属对象
         */
        public setTimeOut(delay: number, method: Function, methodObj: any): void {
            this.addTick(delay, 1, method, methodObj);
        }

        /**
         * 在指定的帧后运行指定的函数。
         * @param delay 执行间隔:帧频
         * @param method 执行函数
         * @param methodObj 执行函数所属对象
         */
        public setFrameOut(delay: number, method: Function, methodObj: any): void {
            this.addFrame(delay, 1, method, methodObj);
        }

        /**
         *
         * 定时执行
         * @param delay 执行间隔:毫秒
         * @param repeatCount 执行次数, 当replayCount <= 0时为无限执行
         * @param method 执行函数
         * @param methodObj 执行函数所属对象
         * @param methodParams 执行函数参数
         * @param complateMethod 完成执行函数
         * @param complateMethodParams 完成执行函数参数
         * @param complateMethodObj 完成执行函数所属对象
         *
         */
        public addTick(delay: number, repeatCount: number, method: Function, methodObj: any, methodParams: any = null, complateMethod: Function = null, complateMethodObj: any = null, complateMethodParams: any = null): void {
            this.create(false, delay, repeatCount, method, methodObj, methodParams, complateMethod, complateMethodObj, complateMethodParams);
        }

        /**
         *
         * 定时执行
         * @param delay 执行间隔:帧频
         * @param repeatCount 执行次数, 当replayCount <= 0时为无限执行
         * @param method 执行函数
         * @param methodParams 执行函数参数
         * @param complateMethod 完成执行函数
         * @param complateMethodParams 完成执行函数参数
         * @param complateMethodObj 完成执行函数所属对象
         *
         */
        public addFrame(delay: number, repeatCount: number, method: Function, methodObj: any, methodParams: any = null, complateMethod: Function = null, complateMethodObj: any = null, complateMethodParams: any = null): void {
            this.create(true, delay, repeatCount, method, methodObj, methodParams, complateMethod, complateMethodObj, complateMethodParams);
        }

        /**
         * 定时器执行数量
         * @return
         *
         */
        public get count(): number {
            return this._count;
        }

        /**
         * 清理
         * @param method 要移除的函数
         * @param methodObj 要移除的函数对应的对象
         */
        public removeTick(method: Function, methodObj: any): void {
            for (var i: number = 0; i < this._count; i++) {
                var handler: TimerHandler = this._handlers[i];
                if (handler.method == method && handler.methodObj == methodObj && this._delHandlers.indexOf(handler) == -1) {
                    this._delHandlers.push(handler);
                    break;
                }
            }
        }

        /**
         * 清理
         * @param method 要移除的函数
         * @param methodObj 要移除的函数对应的对象
         */
        public removeTicks(methodObj: any): void {
            for (var i: number = 0; i < this._count; i++) {
                var handler: TimerHandler = this._handlers[i];
                if (handler.methodObj == methodObj && this._delHandlers.indexOf(handler) == -1) {
                    this._delHandlers.push(handler);
                }
            }
        }

        /**
         * 清理
         * @param methodObj 要移除的函数对应的对象
         */
        public removeAll(methodObj: any): void {
            for (var i: number = 0; i < this._count; i++) {
                var handler: TimerHandler = this._handlers[i];
                if (handler.methodObj == methodObj && this._delHandlers.indexOf(handler) == -1) {
                    this._delHandlers.push(handler);
                }
            }
        }

        /**
         * 检测是否已经存在
         * @param method
         * @param methodObj
         *
         */
        public isExists(method: Function, methodObj: any): boolean {
            for (var i: number = 0; i < this._count; i++) {
                var handler: TimerHandler = this._handlers[i];
                if (handler.method == method && handler.methodObj == methodObj && this._delHandlers.indexOf(handler) == -1) {
                    return true;
                }
            }
            return false;
        }

        /**
         * 暂停
         */
        public pause(): void {
            if (this._isPause) {
                return;
            }
            this._isPause = true;
            this._pauseTime = egret.getTimer();
        }

        /**
         * 从暂停中恢复
         */
        public resume(): void {
            if (!this._isPause) {
                return;
            }
            this._isPause = false;
            this._currTime = egret.getTimer();
            var gap = this._currTime - this._pauseTime;
            for (var i: number = 0; i < this._count; i++) {
                var handler: TimerHandler = this._handlers[i];
                handler.dealTime += gap;
                if (!handler.userFrame) {
                    handler.exeTime += gap;
                }
            }
        }

        public static get instance(): TimerManager {
            if (TimerManager.s_instance == null) {
                TimerManager.s_instance = new TimerManager();
            }
            return TimerManager.s_instance;
        }
    }

    export class TimerHandler {
        /**执行间隔*/
        public delay: number = 0;
        /**是否重复执行*/
        public repeat: boolean;
        /**重复执行次数*/
        public repeatCount: number = 0;
        /**是否用帧率*/
        public userFrame: boolean;
        /**执行时间*/
        public exeTime: number = 0;
        /**处理函数*/
        public method: Function;
        /**处理函数所属对象*/
        public methodObj: any;
        /**处理函数参数*/
        public methodParams: any;
        /**完成处理函数*/
        public complateMethod: Function;
        /**完成处理函数所属对象*/
        public complateMethodObj: any;
        /**完成处理函数参数*/
        public complateMethodParams: any;
        /**上次的执行时间*/
        public dealTime: number = 0;

        /**清理*/
        public clear(): void {
            this.method = null;
            this.methodObj = null;
            this.complateMethod = null;
            this.complateMethodObj = null;
        }
    }
}

window['TimerHandler'] = core.TimerHandler;