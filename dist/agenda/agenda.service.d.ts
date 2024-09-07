import { AgendaService as AgendaAgent } from '@agent-ly/nestjs-agenda';
import { JobDTO } from './dtos';
import { Job } from 'agenda';
export declare class AgendaService {
    private readonly agendaAgent;
    private readonly logger;
    constructor(agendaAgent: AgendaAgent);
    initialize(): Promise<void>;
    rescheduleEvents(): Promise<void>;
    getJobs(): Promise<Job[]>;
    scheduleJob(jobDTO: JobDTO): Promise<{
        jobId: string;
    }>;
    cancelJob(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
    rescheduleJob(id: string, jobDTO: JobDTO): Promise<{
        jobId: string;
    }>;
    private getJobPayload;
}
