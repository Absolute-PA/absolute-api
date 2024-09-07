import { Job } from 'agenda';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AuditService } from '@/audit/audit.service';
import { PlaySoundCommand } from './commands';
export declare class SoundProcessor {
    private readonly eventEmitter;
    private readonly auditService;
    private readonly logger;
    constructor(eventEmitter: EventEmitter2, auditService: AuditService);
    playSound(job: Job<PlaySoundCommand>): Promise<void>;
}
