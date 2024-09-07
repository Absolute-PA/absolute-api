import { Job } from 'agenda';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AuditService } from '@/audit/audit.service';
import { PlayMusicCommand } from './commands';
export declare class MusicProcessor {
    private readonly eventEmitter;
    private readonly auditService;
    private readonly logger;
    constructor(eventEmitter: EventEmitter2, auditService: AuditService);
    playMusic(job: Job<PlayMusicCommand>): Promise<void>;
}
