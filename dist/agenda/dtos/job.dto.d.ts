import { JobType } from '@/common/enums';
import { AuditCreateDto } from '@root/src/audit/dtos/audit-create.dto';
interface JobAttributes {
    attributes: Record<string, string | number>;
    jobType: JobType;
    audit: AuditCreateDto;
}
export interface RepeatJobDTO extends JobAttributes {
    every: string;
    startDate: string;
    endDate: string;
}
export interface ScheduleJobDTO extends JobAttributes {
    when: string;
}
export type JobDTO = RepeatJobDTO | ScheduleJobDTO;
export declare const isRepeatJobDTO: (job: JobDTO) => job is RepeatJobDTO;
export declare const isScheduleJobDTO: (job: JobDTO) => job is ScheduleJobDTO;
export {};
