"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgendaModule = void 0;
const common_1 = require("@nestjs/common");
const nestjs_agenda_1 = require("@agent-ly/nestjs-agenda");
const schedule_module_1 = require("@/schedule/schedule.module");
const setting_module_1 = require("@/setting/setting.module");
const sound_processor_1 = require("./sound.processor");
const job_processor_1 = require("./job.processor");
const music_processor_1 = require("./music.processor");
const agenda_controller_1 = require("./agenda.controller");
const agenda_service_1 = require("./agenda.service");
const audit_module_1 = require("../audit/audit.module");
const voiceRecorded_processor_1 = require("./voiceRecorded.processor");
const textToAudio_processor_1 = require("./textToAudio.processor");
let AgendaModule = class AgendaModule {
};
AgendaModule = __decorate([
    (0, common_1.Module)({
        imports: [
            schedule_module_1.ScheduleModule,
            setting_module_1.SettingModule,
            audit_module_1.AuditModule,
            nestjs_agenda_1.AgendaModule.forRoot({
                db: {
                    address: process.env.NODEWEB_DB_URL,
                },
            }),
        ],
        controllers: [agenda_controller_1.AgendaController],
        providers: [
            agenda_service_1.AgendaService,
            sound_processor_1.SoundProcessor,
            job_processor_1.JobProccessor,
            music_processor_1.MusicProcessor,
            voiceRecorded_processor_1.VocieRecoredProcessor,
            textToAudio_processor_1.TextToAudioProcessor,
        ],
        exports: [agenda_service_1.AgendaService],
    })
], AgendaModule);
exports.AgendaModule = AgendaModule;
//# sourceMappingURL=agenda.module.js.map