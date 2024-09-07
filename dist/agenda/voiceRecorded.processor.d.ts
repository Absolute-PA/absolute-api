import { Job } from 'agenda';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AuditService } from '@/audit/audit.service';
import { PlayVoiceCommand } from './commands';
export declare class VocieRecoredProcessor {
    private readonly eventEmitter;
    private readonly auditService;
    private readonly logger;
    constructor(eventEmitter: EventEmitter2, auditService: AuditService);
    playSound(job: Job<PlayVoiceCommand>): Promise<void>;
}
