namespace ttaby {
    export class SoundManager {
        public constructor() {
        }

        /**
         * 播放音效
         * @param effectName
         */
        public static playEffect(effectName: string, loops: number = 1): void {
            core.SoundManager.instance.playEffect(effectName, loops);
        }

        /**
         * 停止音效播放
         * @param effectName
         */
        public static stopEffect(effectName: string): void {
            core.SoundManager.instance.stopEffect(effectName);
        }

        /**
         * 播放背景音乐
         * @param key
         */
        public static playBg(bgName: string): void {
            core.SoundManager.instance.playBg(bgName);
        }

        /**
         * 替换背景音乐
         */
        public static replaceBg(bgName: string):void{
            core.SoundManager.instance.stopAllBg();
            core.SoundManager.instance.playBg(bgName);
        }

        /**
         * 停止背景音乐
         */
        public static stopBg(bgName: string): void {
            core.SoundManager.instance.stopBg(bgName);
        }

        /**
         * 停止背景所有音乐
         */
        public static stopAllBg(): void {
            core.SoundManager.instance.stopAllBg();
        }

        /**
         * 暂停背景音乐
         */
        public static pauseBg(): void {
            core.SoundManager.instance.pauseBg();
        }

        /**
         * 恢复背景音乐
         */
        public static resumeBg(): void {
            core.SoundManager.instance.resumeBg();
        }

        /**
         * 设置音效是否开启
         * @param $isOn
         */
        public static setEffectOn(isOn: boolean): void {
            core.SoundManager.instance.setEffectOn(isOn);
        }

        /**
         * 设置背景音乐是否开启
         * @param $isOn
         */
        public static setBgOn(isOn: boolean): void {
            core.SoundManager.instance.setBgOn(isOn);
        }

        /**
         * 设置背景音乐音量
         * @param volume
         */
        public static setBgVolume(volume: number): void {
            core.SoundManager.instance.setBgVolume(volume);
        }

        /**
         * 获取背景音乐音量
         * @returns {number}
         */
        public static getBgVolume(): number {
            return core.SoundManager.instance.getBgVolume();
        }

        /**
         * 设置音效音量
         * @param volume
         */
        public static setEffectVolume(volume: number): void {
            core.SoundManager.instance.setEffectVolume(volume);
        }

        /**
         * 获取音效音量
         * @returns {number}
         */
        public static getEffectVolume(): number {
            return core.SoundManager.instance.getEffectVolume();
        }

        /**
         * 背景音乐是否已开启
         * @returns {boolean}
         */
        public static bgIsOn(): boolean {
            return core.SoundManager.instance.bgIsOn;
        }

        /**
         * 音效是否已开启
         * @returns {boolean}
         */
        public static effectIsOn(): boolean {
            return core.SoundManager.instance.effectIsOn;
        }
    }
}
