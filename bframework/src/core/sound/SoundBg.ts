namespace core {
    export class SoundBg extends BaseSound implements ISoundBg {
        private m_volume: number;
        private m_soundLoops: { [key: string]: number } = {};
        private m_soundChannels: { [key: string]: SoundChannelInfo } = {};

        /**
         * 构造函数
         */
        public constructor() {
            super();
        }

        /**
         * 停止当前音乐
         */
        public stop(bgName: string): void {
            for (let key in this.m_soundChannels) {
                if (key === bgName) {
                    let sc = this.m_soundChannels[key];
                    sc.soundChannel.stop();

                    delete this.m_soundChannels[key];
                }
            }
        }

        /**
         * 停止当前所有音乐
         */
        public stopAll(): void {
            for (let key in this.m_soundChannels) {
                let sc = this.m_soundChannels[key];
                sc.soundChannel.stop();

                delete this.m_soundChannels[key];
            }
        }

        /**
         * 播放某个音乐
         * @param effectName
         */
        public play(bgName: string): void {
            if (this.m_soundChannels[bgName]) {
                return;
            }

            var sound: egret.Sound = this.getSound(bgName);
            if (sound) {
                this.playSound(sound, bgName);
            } else {
                this.m_soundLoops[bgName] = 1;
            }
        }

        /**
         * 暂停
         */
        public pause(): void {
            for (let key in this.m_soundChannels) {
                let sc = this.m_soundChannels[key];
                sc.pausePosition = sc.soundChannel.position;
                sc.soundChannel.stop();
            }
        }

        /**
         * 恢复
         */
        public resume(): void {
            for (let key in this.m_soundChannels) {
                let sc = this.m_soundChannels[key];
                sc.soundChannel = sc.sound.play(sc.pausePosition);
                sc.pausePosition = 0;
            }
        }

        /**
         * 播放
         * @param sound
         */
        private playSound(sound: egret.Sound, bgName: string): void {
            var channel: egret.SoundChannel = sound.play(0);
            channel.volume = this.m_volume;

            let scInfo = new SoundChannelInfo();
            scInfo.pausePosition = 0;
            scInfo.sound = sound;
            scInfo.soundChannel = channel;
            this.m_soundChannels[bgName] = scInfo;
        }

        /**
         * 设置音量
         * @param volume
         */
        public setVolume(volume: number): void {
            this.m_volume = volume;
            for (let key in this.m_soundChannels) {
                let sc = this.m_soundChannels[key];
                sc.soundChannel.volume = this.m_volume;
            }
        }

        /**
         * 资源加载完成后处理播放
         * @param key
         */
        public loadedPlay(key: string): void {
            this.playSound(RES.getRes(key), key);
            delete this.m_soundLoops[key];
        }

        /**
         * 检测一个文件是否要清除
         * @param key
         * @returns {boolean}
         */
        public checkCanClear(key: string): boolean {
            return false;
        }
    }
}