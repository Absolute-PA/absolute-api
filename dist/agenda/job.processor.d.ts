import { Job } from 'agenda';
import { AgendaService } from '@agent-ly/nestjs-agenda';
import { ScheduleService } from '@/schedule/schedule.service';
import { SettingService } from '@/setting/setting.service';
export declare class JobProccessor {
    private readonly agendaService;
    private readonly scheduleService;
    private readonly settingService;
    private readonly logger;
    constructor(agendaService: AgendaService, scheduleService: ScheduleService, settingService: SettingService);
    checkEvent(job: Job): Promise<void>;
    purgeTempUploadedFiles(job: Job): Promise<void>;
}
