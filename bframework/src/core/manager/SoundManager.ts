namespace core {
    /**
     * Sound管理类
     */
    export class SoundManager {

        private static s_instance: SoundManager;
        /**
         * 音乐文件清理时间
         * @type {number}
         */
        public static CLEAR_TIME: number = 3 * 60 * 1000;

        //LocalStorage使用的key值
        private LocalStorageKey_Bg: string = "bgMusicFlag";
        private LocalStorageKey_Effect: string = "effectMusicFlag";

        //音量LocalStorage使用的key值
        private LocalStorageKey_BgVolume: string = "bgMusicVolume";
        private LocalStorageKey_EffectVolume: string = "effectMusicVolume";

        private effect: ISoundEffect;
        private bg: ISoundBg;
        private effectOn: boolean;
        private bgOn: boolean;
        private bgVolume: number;
        private effectVolume: number;

        /**
         * 构造函数
         */
        public constructor() {
            let func = null;
            if (PlatUtils.isWeGame) {
                this.bg = new SoundBgWx();
                this.effect = new SoundEffectWx();
                func = () => {
                    return wx.createInnerAudioContext();
                };
                SoundPool.InitObjecPooltWithCount("SoundEffect", 12, func);
            } else {
                this.bg = new SoundBg();
                this.effect = new SoundEffect();
            }

            this.setDefaultSwitchState();
            this.setDefaultVolume();

            core.EventManager.getInstance().addEventListener(ttaby.CustomEventID.GAMERESUME, this.OnResume, this);
            core.EventManager.getInstance().addEventListener(ttaby.CustomEventID.GAMEPAUSE, this.OnPause, this);
        }

        /**
         * 游戏从后台恢复
         */
        private OnResume(): void {
            if (this.bgIsOn) {
                this.bg.resume();
            }
        }
		/**
		 * 游戏进入后台
		 */
        private OnPause(): void {
            if (this.bgIsOn) {
                this.bg.pause();
            }
        }

        /**
         * 设置背景音乐和音效的默认开关状态
         */
        private setDefaultSwitchState(): void {
            let bgMusicFlag = egret.localStorage.getItem(this.LocalStorageKey_Bg);
            if (!bgMusicFlag) {
                this.bgOn = true;
            } else {
                this.bgOn = bgMusicFlag == "1";
            }

            let effectMusicFlag = egret.localStorage.getItem(this.LocalStorageKey_Effect);
            if (!effectMusicFlag) {
                this.effectOn = true;
            } else {
                this.effectOn = effectMusicFlag == "1";
            }

            Log.info("背景音乐：", bgMusicFlag, this.bgOn);
            Log.info("音效：", effectMusicFlag, this.effectOn);
        }
        /**
         * 默认音量
         */
        private setDefaultVolume(): void {
            this.bgVolume = 1;
            this.effectVolume = 1;

            let _bgVolume = egret.localStorage.getItem(this.LocalStorageKey_BgVolume);
            if (_bgVolume) {
                this.bgVolume = Number(_bgVolume);
            }

            let _effectVolume = egret.localStorage.getItem(this.LocalStorageKey_EffectVolume);
            if (_effectVolume) {
                this.effectVolume = Number(_effectVolume);
            }

            if (this.bgVolume <= 0) {
                this.bgOn = false;
            }

            if (this.effectVolume <= 0) {
                this.effectOn = false;
            }

            this.bg.setVolume(this.bgVolume);
            this.effect.setVolume(this.effectVolume);
        }

        /**
         * 播放音效
         * @param effectName
         */
        public playEffect(effectName: string, loops: number = 1): void {
            if (!this.effectOn)
                return;

            this.effect.play(effectName, loops);
        }

        /**
         * 停止音效播放
         * @param effectName
         */
        public stopEffect(effectName: string): void {
            this.effect.stop(effectName);
        }

        /**
         * 播放背景音乐
         * @param key
         */
        public playBg(bgName: string): void {
            if (!this.bgOn)
                return;

            this.bg.play(bgName);
        }

        /**
         * 停止背景音乐
         */
        public stopBg(effectName: string): void {
            this.bg.stop(effectName);
        }

        /**
         * 停止所有背景音乐
         */
        public stopAllBg(): void {
            this.bg.stopAll();
        }

        /**
         * 暂停背景音乐
         */
        public pauseBg(): void {
            this.bg.pause();
        }

        /**
         * 恢复背景音乐
         */
        public resumeBg(): void {
            this.bg.resume();
        }

        /**
         * 设置音效是否开启
         * @param $isOn
         */
        public setEffectOn($isOn: boolean): void {
            this.effectOn = $isOn;
            egret.localStorage.setItem(this.LocalStorageKey_Effect, $isOn ? "1" : "0");
        }

        /**
         * 设置背景音乐是否开启
         * @param $isOn
         */
        public setBgOn($isOn: boolean): void {
            this.bgOn = $isOn;
            egret.localStorage.setItem(this.LocalStorageKey_Bg, $isOn ? "1" : "0");

            if (!this.bgOn) {
                this.pauseBg();
            } else {
                this.resumeBg();
            }
        }

        /**
         * 设置背景音乐音量
         * @param volume
         */
        public setBgVolume(volume: number): void {
            volume = Math.min(volume, 1);
            volume = Math.max(volume, 0);
            this.bgVolume = volume;
            egret.localStorage.setItem(this.LocalStorageKey_BgVolume, volume.toString());

            if (this.bgVolume <= 0) {
                this.bg.setVolume(this.bgVolume);
                if (this.bgIsOn) {
                    this.setBgOn(false);
                }
            } else {
                if (!this.bgIsOn) {
                    this.setBgOn(true);
                }
                this.bg.setVolume(this.bgVolume);
            }
        }

        /**
         * 获取背景音乐音量
         * @returns {number}
         */
        public getBgVolume(): number {
            return this.bgVolume;
        }

        /**
         * 设置音效音量
         * @param volume
         */
        public setEffectVolume(volume: number): void {
            volume = Math.min(volume, 1);
            volume = Math.max(volume, 0);
            this.effectVolume = volume;
            this.effect.setVolume(this.effectVolume);
            egret.localStorage.setItem(this.LocalStorageKey_EffectVolume, volume.toString());
            if (this.effectVolume <= 0) {
                if (this.effectIsOn) {
                    this.setEffectOn(false);
                }
            } else {
                if (!this.effectIsOn) {
                    this.setEffectOn(true);
                }
            }
        }

        /**
         * 获取音效音量
         * @returns {number}
         */
        public getEffectVolume(): number {
            return this.effectVolume;
        }

        /**
         * 背景音乐是否已开启
         * @returns {boolean}
         */
        public get bgIsOn(): boolean {
            return this.bgOn;
        }

        /**
         * 音效是否已开启
         * @returns {boolean}
         */
        public get effectIsOn(): boolean {
            return this.effectOn;
        }

        public static get instance(): SoundManager {
            if (SoundManager.s_instance == null) {
                SoundManager.s_instance = new SoundManager();
            }
            return SoundManager.s_instance;
        }
    }
}