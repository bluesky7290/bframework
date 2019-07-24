namespace core {
    class WxAudioInfo {
        public audio: wx.InnerAudioContext;
        public currentTime: number;
    }

    /**
     * 音效类(微信小游戏专用)
     */
    export class SoundBgWx implements ISoundBg {
        private m_volume: number;
        private m_soundAudios: { [key: string]: WxAudioInfo } = {};

        /**
         * 构造函数
         */
        public constructor() {
        }

        /**
         * 停止当前音乐
         */
        public stop(bgName: string): void {
            for (let key in this.m_soundAudios) {
                if (key === bgName) {
                    let wxAudioInfo = this.m_soundAudios[key];
                    wxAudioInfo.audio.pause();
                    wxAudioInfo.audio.destroy();

                    delete this.m_soundAudios[key];
                    break;
                }
            }
        }

        /**
         * 停止当前所有音乐
         */
        public stopAll(): void {
            for (let key in this.m_soundAudios) {
                let wxAudioInfo = this.m_soundAudios[key];
                wxAudioInfo.audio.pause();
                wxAudioInfo.audio.destroy();
            }
            this.m_soundAudios = {};
        }

        /**
         * 播放某个音乐
         * @param bgName
         */
        public play(bgName: string): void {
            if (this.m_soundAudios[bgName]) {
                return;
            }

            let audio = wx.createInnerAudioContext();
            audio.src = RES.getVirtualUrl(ResUtils.getFileRealPath(bgName));
            audio.loop = true;
            audio.volume = this.m_volume;
            audio.startTime = 0;
            audio.play();

            let wxAudioInfo = new WxAudioInfo();
            wxAudioInfo.audio = audio;
            wxAudioInfo.currentTime = 0;

            this.m_soundAudios[bgName] = wxAudioInfo;
        }

        /**
         * 暂停
         */
        public pause(): void {
            for (let key in this.m_soundAudios) {
                let wxAudioInfo = this.m_soundAudios[key];
                wxAudioInfo.currentTime = wxAudioInfo.audio.currentTime;
                wxAudioInfo.audio.pause();
            }
        }

        /**
         * 恢复
         */
        public resume(): void {
            for (let key in this.m_soundAudios) {
                let wxAudioInfo = this.m_soundAudios[key];
                wxAudioInfo.audio.seek(wxAudioInfo.currentTime);
                wxAudioInfo.audio.startTime = wxAudioInfo.currentTime;
                wxAudioInfo.audio.play();
            }
        }

        /**
         * 设置音量
         * @param volume
         */
        public setVolume(volume: number): void {
            this.m_volume = volume;
            for (let key in this.m_soundAudios) {
                let wxAudioInfo = this.m_soundAudios[key];
                wxAudioInfo.audio.volume = this.m_volume;
            }
        }
    }
}