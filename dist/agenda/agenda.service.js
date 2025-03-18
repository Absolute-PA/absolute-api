"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var AgendaService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgendaService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_agenda_1 = require("@agent-ly/nestjs-agenda");
const event_emitter_1 = require("@nestjs/event-emitter");
const mongodb_1 = require("mongodb");
const enums_1 = require("@/common/enums");
const events_1 = require("@/common/events");
const job_1 = require("@/common/job");
const dtos_1 = require("./dtos");
const mappers_1 = require("./mappers");
const voice_mapper_1 = require("./mappers/voice.mapper");
const textToAudio_mapper_1 = require("./mappers/textToAudio.mapper");
let AgendaService = AgendaService_1 = class AgendaService {
    constructor(agendaAgent) {
        this.agendaAgent = agendaAgent;
        this.logger = new common_1.Logger(AgendaService_1.name);
        this.initialize();
    }
    async initialize() {
        await this.agendaAgent.purge();
        this.agendaAgent.every('0 0 * * *', enums_1.BackgroundJobType.CheckEvent);
        this.agendaAgent.every('0 0 * * *', enums_1.BackgroundJobType.PurgeTempUploadedFiles);
        this.agendaAgent.now(enums_1.BackgroundJobType.CheckEvent, null);
    }
    async rescheduleEvents() {
        this.logger.log(`Scheduling events...`);
        await this.agendaAgent.cancel({
            name: { $in: Object.values(enums_1.JobType) },
        });
        this.agendaAgent.now(enums_1.BackgroundJobType.CheckEvent, null);
    }
    async getJobs() {
        const jobs = await this.agendaAgent.jobs({
            nextRunAt: { $exists: true, $ne: null },
        });
        return jobs;
    }
    async scheduleJob(jobDTO) {
        const data = this.getJobPayload(jobDTO);
        const isScheduleJob = (0, dtos_1.isScheduleJobDTO)(jobDTO);
        const time = isScheduleJob ? jobDTO.when : jobDTO.every;
        let job;
        if (isScheduleJob) {
            job = await this.agendaAgent.schedule(time, jobDTO.jobType, data);
        }
        else {
            job = await this.agendaAgent.every(time, jobDTO.jobType, data, {
                startDate: new Date(jobDTO.startDate),
                endDate: new Date(jobDTO.endDate),
                skipImmediate: true,
            });
        }
        return { jobId: job.attrs._id.toString() };
    }
    async cancelJob(id) {
        const jobs = await this.agendaAgent.jobs({ _id: new mongodb_1.ObjectId(id) });
        if (!jobs.length) {
            return { success: true, message: `Job ${id} not found` };
        }
        const isSuccess = await this.agendaAgent.cancel({
            _id: new mongodb_1.ObjectId(id),
        });
        job_1.PROCESS_CACHE.killProcess(id);
        if (isSuccess) {
            return { success: true, message: `Job ${id} is cancelled` };
        }
        return { success: false, message: `Failed to cancel job ${id}` };
    }
    async rescheduleJob(id, jobDTO) {
        await this.cancelJob(id);
        return await this.scheduleJob(jobDTO);
    }
    getJobPayload(jobDTO) {
        switch (jobDTO.jobType) {
            case enums_1.JobType.PlaySound: {
                return (0, mappers_1.toPlaySoundCommand)(jobDTO);
            }
            case enums_1.JobType.PlayMusic: {
                return (0, mappers_1.toPlayMusicCommand)(jobDTO);
            }
            case enums_1.JobType.PlayVoiceRecorded: {
                return (0, voice_mapper_1.toPlayVoiceCommand)(jobDTO);
            }
            case enums_1.JobType.PlayTextToAudio: {
                return (0, textToAudio_mapper_1.toPlayTextToAudioCommand)(jobDTO);
            }
            default:
                throw new common_1.NotFoundException('Job type not found');
        }
    }
};
__decorate([
    (0, event_emitter_1.OnEvent)(events_1.ScheduleChangedEvent.Updated),
    (0, event_emitter_1.OnEvent)(events_1.ScheduleChangedEvent.Deleted),
    (0, event_emitter_1.OnEvent)(events_1.EventChangedEvent.Created),
    (0, event_emitter_1.OnEvent)(events_1.EventChangedEvent.Updated),
    (0, event_emitter_1.OnEvent)(events_1.EventChangedEvent.Deleted),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AgendaService.prototype, "rescheduleEvents", null);
AgendaService = AgendaService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_agenda_1.AgendaService])
], AgendaService);
exports.AgendaService = AgendaService;
//# sourceMappingURL=agenda.service.js.map