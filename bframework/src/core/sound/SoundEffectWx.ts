namespace core {
    /**
     * 音效类(微信小游戏专用)
     */
    export class SoundEffectWx implements ISoundEffect {
        private m_wx: any;
        private m_volume: number;
        private m_soundLoop: { [key: string]: wx.InnerAudioContext } = {};

        /**
         * 构造函数
         */
        public constructor() {
        }

        /**
         * 检测一个文件是否要清除
         * @param key
         * @returns {boolean}
         */
        private checkCanClear(key: string): boolean {
            return true;
        }

        /**
         * 播放一个音效
         * @param effectName
         */
        public play(effectName: string, loops: number): void {
            let audio = SoundPool.pop("SoundEffect") as wx.InnerAudioContext;
            audio.src = RES.getVirtualUrl(ResUtils.getFileRealPath(effectName));
            audio.loop = loops <= 0 ? true : false;
            audio.volume = this.m_volume;
            audio.startTime = 0;
            audio.seek(0);
            audio.play();
            if (audio.loop) {
                this.m_soundLoop[effectName] = audio;
            }

            function onEnded() {
                SoundPool.push(audio);
                audio.offEnded(onEnded);
            };
            audio.onEnded(onEnded);
        }

        /**
         * 停止音效
         */
        public stop(effectName: string): void {
            if (this.m_soundLoop[effectName]) {
                let audio = this.m_soundLoop[effectName];
                audio.pause();

                delete this.m_soundLoop[effectName];
            }
        }

        /**
         * 设置音量
         * @param volume
         */
        public setVolume(volume: number): void {
            this.m_volume = volume;
        }
    }
}