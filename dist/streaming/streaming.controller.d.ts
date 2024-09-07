import type { Response } from 'express';
import { StreamingService } from './streaming.service';
export declare class StreamingController {
    private audioService;
    private readonly logger;
    constructor(audioService: StreamingService);
    playAudioFile(filePath: string, res: Response): Promise<string>;
    startStreaming(): Promise<void>;
    stopStreamAudio(res: Response): Promise<void>;
}
