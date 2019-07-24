namespace core {
    export interface ISoundBg {
        play(bgName: string): void;
        stop(bgName: string): void;
        stopAll(): void;
        setVolume(volume: number): void;
        pause();
        resume();
    }
}