import { AuditCreateDto } from '@root/src/audit/dtos/audit-create.dto';
export interface JobCommand {
    durationInSecond?: number;
    audit: AuditCreateDto;
}
