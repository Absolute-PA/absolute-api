import { AuditActor } from '@root/src/common/enums';
export interface AuditCreateDto {
    actor: AuditActor;
    name: string;
    message: string;
}
