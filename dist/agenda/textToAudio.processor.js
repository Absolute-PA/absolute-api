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
var TextToAudioProcessor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextToAudioProcessor = void 0;
const common_1 = require("@nestjs/common");
const nestjs_agenda_1 = require("@agent-ly/nestjs-agenda");
const agenda_1 = require("agenda");
const event_emitter_1 = require("@nestjs/event-emitter");
const enums_1 = require("@/common/enums");
const events_1 = require("@/common/events");
const audit_service_1 = require("@/audit/audit.service");
let TextToAudioProcessor = TextToAudioProcessor_1 = class TextToAudioProcessor {
    constructor(eventEmitter, auditService) {
        this.eventEmitter = eventEmitter;
        this.auditService = auditService;
        this.logger = new common_1.Logger(TextToAudioProcessor_1.name);
    }
    async playTextToAudio(job) {
        const payload = {
            textToAudioId: job.attrs.data.textToAudioId,
            jobId: job.attrs._id.toString(),
            durationInSecond: job.attrs.data.durationInSecond,
        };
        console.log(job, 'job');
        this.auditService.create(job.attrs.data.audit);
        this.eventEmitter.emit(events_1.SoundEvent.TextToAudio, payload);
    }
};
__decorate([
    (0, nestjs_agenda_1.Define)(enums_1.JobType.PlayTextToAudio),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [agenda_1.Job]),
    __metadata("design:returntype", Promise)
], TextToAudioProcessor.prototype, "playTextToAudio", null);
TextToAudioProcessor = TextToAudioProcessor_1 = __decorate([
    (0, nestjs_agenda_1.Processor)(),
    __metadata("design:paramtypes", [event_emitter_1.EventEmitter2,
        audit_service_1.AuditService])
], TextToAudioProcessor);
exports.TextToAudioProcessor = TextToAudioProcessor;
//# sourceMappingURL=textToAudio.processor.js.map