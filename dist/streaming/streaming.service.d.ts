/// <reference types="node" />
/// <reference types="node" />
import { ChildProcessWithoutNullStreams } from 'child_process';
import { Stream } from 'stream';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
export declare class StreamingService {
    private userService;
    private jwtService;
    private childProcess;
    private readonly logger;
    private page;
    private browser;
    constructor(userService: UserService, jwtService: JwtService);
    private streamingGateway;
    spawnMpgPlayer(): void;
    playStreamAudio(stream: Stream): Promise<void>;
    playStreamAudioAsync(stream: Stream): {
        process: ChildProcessWithoutNullStreams;
        promise: Promise<boolean>;
    };
    createStreamFromFile(filePath: string): Stream;
    stopStreamAudio(): Promise<void>;
    openServerUIStream(): Promise<void>;
    closeServerUIStream(): Promise<void>;
}
