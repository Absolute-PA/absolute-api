import { AuditDto } from '../dtos/audit-response.dto';
import { AuditDocument } from '../schemas/audit.schema';
export declare const mapToAuditDto: (document: AuditDocument) => AuditDto;
