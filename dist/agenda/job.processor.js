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
var JobProccessor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobProccessor = void 0;
const common_1 = require("@nestjs/common");
const agenda_1 = require("agenda");
const nestjs_agenda_1 = require("@agent-ly/nestjs-agenda");
const enums_1 = require("@/common/enums");
const schedule_service_1 = require("@/schedule/schedule.service");
const setting_service_1 = require("@/setting/setting.service");
const file_1 = require("@/common/file");
const constants_1 = require("@/common/constants");
let JobProccessor = JobProccessor_1 = class JobProccessor {
    constructor(agendaService, scheduleService, settingService) {
        this.agendaService = agendaService;
        this.scheduleService = scheduleService;
        this.settingService = settingService;
        this.logger = new common_1.Logger(JobProccessor_1.name);
    }
    async checkEvent(job) {
        this.logger.log(`Server time: ${new Date()}. Job: ${job.attrs.name}`);
        const setting = await this.settingService.updateExpiryStatus();
        if (setting.isExpired) {
            this.logger.log('Invalid or expired license key!');
            if (process.env.NODE_ENV !== 'development') {
                return;
            }
        }
        this.logger.log(`Canceling all old background checks...`);
        await this.agendaService.cancel({
            name: {
                $nin: [
                    enums_1.BackgroundJobType.CheckEvent,
                    enums_1.BackgroundJobType.PurgeTempUploadedFiles,
                ],
            },
            type: 'single',
        });
        this.logger.log(`Fetching today schedule...`);
        const schedule = await this.scheduleService.findEligibleSchedule(new Date());
        this.logger.log(`Eligible schedule: ${schedule === null || schedule === void 0 ? void 0 : schedule.name}`);
        if (!schedule || !schedule.events || schedule.events.length === 0) {
            return;
        }
        schedule.events.forEach((event) => {
            this.logger.log(`Scheduling event: ${event.time} - ${event.jobType} - ${event.name}`);
            const eventTime = new Date();
            const currentHour = eventTime.getHours();
            const currentMinute = eventTime.getMinutes();
            const currentSecond = eventTime.getSeconds();
            const [hours, minutes, seconds] = event.time.split(':');
            if (+hours < currentHour ||
                (+hours === currentHour && +minutes < currentMinute) ||
                (+hours === currentHour &&
                    +minutes === currentMinute &&
                    +seconds < currentSecond)) {
                return;
            }
            eventTime.setHours(+hours);
            eventTime.setMinutes(+minutes);
            eventTime.setSeconds(+seconds);
            switch (event.jobType) {
                case enums_1.JobType.PlaySound: {
                    const { soundId, durationInSecond } = event.data;
                    if (!soundId)
                        return;
                    const payload = {
                        soundId,
                        durationInSecond,
                        audit: {
                            actor: enums_1.AuditActor.Job,
                            name: enums_1.JobType.PlaySound,
                            message: `Event: ${event.name} - Schedule: ${schedule.name}`,
                        },
                    };
                    this.agendaService.schedule(eventTime, enums_1.JobType.PlaySound, payload);
                    break;
                }
                case enums_1.JobType.PlayMusic: {
                    const { playlistId, durationInSecond } = event.data;
                    if (!playlistId)
                        return;
                    const payload = {
                        playlistId,
                        durationInSecond,
                        audit: {
                            actor: enums_1.AuditActor.Job,
                            name: enums_1.JobType.PlayMusic,
                            message: `Event: ${event.name} - Schedule: ${schedule.name}`,
                        },
                    };
                    this.agendaService.schedule(eventTime, enums_1.JobType.PlayMusic, payload);
                    break;
                }
                case enums_1.JobType.PlayVoiceRecorded: {
                    const { voiceId, durationInSecond } = event.data;
                    if (!voiceId)
                        return;
                    const payload = {
                        voiceId,
                        durationInSecond,
                        audit: {
                            actor: enums_1.AuditActor.Job,
                            name: enums_1.JobType.PlayVoiceRecorded,
                            message: `Event: ${event.name} - Schedule: ${schedule.name}`,
                        },
                    };
                    this.agendaService.schedule(eventTime, enums_1.JobType.PlayVoiceRecorded, payload);
                    break;
                }
                case enums_1.JobType.PlayTextToAudio: {
                    const { textToAudioId, durationInSecond } = event.data;
                    if (!textToAudioId)
                        return;
                    const payload = {
                        textToAudioId,
                        durationInSecond,
                        audit: {
                            actor: enums_1.AuditActor.Job,
                            name: enums_1.JobType.PlayTextToAudio,
                            message: `Event: ${event.name} - Schedule: ${schedule.name}`,
                        },
                    };
                    this.agendaService.schedule(eventTime, enums_1.JobType.PlayTextToAudio, payload);
                    break;
                }
                default:
                    return;
            }
        });
        this.logger.log('Events scheduled!');
    }
    async purgeTempUploadedFiles(job) {
        this.logger.log('Purging temp uploaded files...');
        const { success, message } = await (0, file_1.deleteFilesInFolder)(constants_1.TMP_UPLOAD_DIR);
        if (!success) {
            this.logger.error(`Failed to purge temp uploaded files: ${message}`);
        }
    }
};
__decorate([
    (0, nestjs_agenda_1.Define)(enums_1.BackgroundJobType.CheckEvent),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [agenda_1.Job]),
    __metadata("design:returntype", Promise)
], JobProccessor.prototype, "checkEvent", null);
__decorate([
    (0, nestjs_agenda_1.Define)(enums_1.BackgroundJobType.PurgeTempUploadedFiles),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [agenda_1.Job]),
    __metadata("design:returntype", Promise)
], JobProccessor.prototype, "purgeTempUploadedFiles", null);
JobProccessor = JobProccessor_1 = __decorate([
    (0, nestjs_agenda_1.Processor)(),
    __metadata("design:paramtypes", [nestjs_agenda_1.AgendaService,
        schedule_service_1.ScheduleService,
        setting_service_1.SettingService])
], JobProccessor);
exports.JobProccessor = JobProccessor;
//# sourceMappingURL=job.processor.js.map