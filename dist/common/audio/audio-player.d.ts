/// <reference types="node" />
import { ChildProcessWithoutNullStreams } from 'child_process';
export declare class AudioPlayer {
    private static logger;
    private static player;
    static play(audioPath: string, volume?: number): void;
    static playAsync(audioPath: string | string[], volume?: number, shuffle?: boolean): {
        process: ChildProcessWithoutNullStreams;
        promise: Promise<boolean>;
    };
}
