import { Job } from 'agenda';
import { JobDTO } from './dtos';
import { AgendaService } from './agenda.service';
export declare class AgendaController {
    private readonly agendaService;
    constructor(agendaService: AgendaService);
    getJobs(): Promise<Job[]>;
    scheduleJob(jobDTO: JobDTO): Promise<{
        jobId: string;
    }>;
    rescheduleJob(id: string, jobDTO: JobDTO): Promise<{
        jobId: string;
    }>;
    cancelJob(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
