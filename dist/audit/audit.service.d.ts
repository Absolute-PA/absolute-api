import { AuditDocument } from './schemas/audit.schema';
import { Model } from 'mongoose';
import { AuditCreateDto } from './dtos/audit-create.dto';
import { AuditHistoryDto } from './dtos/audit-response.dto';
export declare class AuditService {
    private readonly auditModel;
    constructor(auditModel: Model<AuditDocument>);
    create(audit: AuditCreateDto): Promise<AuditDocument>;
    findAuditsPaginated(page?: number, limit?: number): Promise<AuditHistoryDto>;
}
