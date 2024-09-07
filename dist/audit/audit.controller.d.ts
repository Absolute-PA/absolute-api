import { AuditService } from './audit.service';
import { AuditHistoryDto } from './dtos/audit-response.dto';
export declare class AuditController {
    private readonly auditService;
    constructor(auditService: AuditService);
    findHistory(page: string, limit: string): Promise<AuditHistoryDto>;
}
