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
var SoundProcessor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoundProcessor = void 0;
const common_1 = require("@nestjs/common");
const nestjs_agenda_1 = require("@agent-ly/nestjs-agenda");
const agenda_1 = require("agenda");
const event_emitter_1 = require("@nestjs/event-emitter");
const enums_1 = require("@/common/enums");
const events_1 = require("@/common/events");
const audit_service_1 = require("@/audit/audit.service");
let SoundProcessor = SoundProcessor_1 = class SoundProcessor {
    constructor(eventEmitter, auditService) {
        this.eventEmitter = eventEmitter;
        this.auditService = auditService;
        this.logger = new common_1.Logger(SoundProcessor_1.name);
    }
    async playSound(job) {
        const payload = {
            soundId: job.attrs.data.soundId,
            jobId: job.attrs._id.toString(),
            durationInSecond: job.attrs.data.durationInSecond,
        };
        this.auditService.create(job.attrs.data.audit);
        this.eventEmitter.emit(events_1.SoundEvent.Play, payload);
    }
};
__decorate([
    (0, nestjs_agenda_1.Define)(enums_1.JobType.PlaySound),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [agenda_1.Job]),
    __metadata("design:returntype", Promise)
], SoundProcessor.prototype, "playSound", null);
SoundProcessor = SoundProcessor_1 = __decorate([
    (0, nestjs_agenda_1.Processor)(),
    __metadata("design:paramtypes", [event_emitter_1.EventEmitter2,
        audit_service_1.AuditService])
], SoundProcessor);
exports.SoundProcessor = SoundProcessor;
//# sourceMappingURL=sound.processor.js.map