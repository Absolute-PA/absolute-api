import { Job } from 'agenda';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AuditService } from '@/audit/audit.service';
import { PlayTextToAudioCommand } from './commands';
export declare class TextToAudioProcessor {
    private readonly eventEmitter;
    private readonly auditService;
    private readonly logger;
    constructor(eventEmitter: EventEmitter2, auditService: AuditService);
    playTextToAudio(job: Job<PlayTextToAudioCommand>): Promise<void>;
}
