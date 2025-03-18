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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleController = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const dayjs = require("dayjs");
const events_1 = require("@/common/events");
const schedule_service_1 = require("./schedule.service");
const dto_1 = require("./dto");
const mappers_1 = require("./mappers");
const event_service_1 = require("./event.service");
let ScheduleController = class ScheduleController {
    constructor(scheduleService, eventService, eventEmitter) {
        this.scheduleService = scheduleService;
        this.eventService = eventService;
        this.eventEmitter = eventEmitter;
    }
    create(createScheduleDto) {
        return this.scheduleService.create(createScheduleDto);
    }
    async findEligibleSchedule(date) {
        const searchingDate = !date || date === 'today' ? new Date() : new Date(date);
        return await this.scheduleService.findEligibleSchedule(searchingDate);
    }
    findAllActiveSchedules(date) {
        const searchingDate = !date || date === 'today' ? new Date() : new Date(date);
        return this.scheduleService.findAllActiveSchedules(searchingDate);
    }
    findAll() {
        return this.scheduleService.findAll();
    }
    findEligibleScheduleBetween(from, to) {
        const dateFrom = dayjs(from || undefined)
            .startOf('day')
            .toDate();
        const dateTo = dayjs(to || undefined)
            .endOf('day')
            .toDate();
        return this.scheduleService.findEligibleScheduleBetween(dateFrom, dateTo);
    }
    findOne(id) {
        return this.scheduleService.findOne(id);
    }
    update(id, updateScheduleDto) {
        const updatedSchedule = this.scheduleService.update(id, updateScheduleDto);
        this.eventEmitter.emit(events_1.ScheduleChangedEvent.Updated, updatedSchedule);
        return updatedSchedule;
    }
    remove(id) {
        const deletedSchedule = this.scheduleService.remove(id);
        this.eventEmitter.emit(events_1.ScheduleChangedEvent.Deleted, deletedSchedule);
        return deletedSchedule;
    }
    async addEvent(id, createEventDto) {
        const newEvent = (0, mappers_1.mapCreateDtoToEventDocument)(createEventDto);
        const createdEvent = this.eventService.addEvent(id, newEvent);
        this.eventEmitter.emit(events_1.EventChangedEvent.Created, createdEvent);
        return createdEvent;
    }
    async removeEvent(id, eventId) {
        const removedEvent = this.eventService.removeEvent(id, eventId);
        this.eventEmitter.emit(events_1.EventChangedEvent.Deleted, removedEvent);
        return removedEvent;
    }
    async updateEvent(id, updateEventDto) {
        const eventToUpdate = (0, mappers_1.mapUpdateDtoToEventDocument)(updateEventDto);
        const updatedEvent = this.eventService.updateEvent(id, eventToUpdate);
        this.eventEmitter.emit(events_1.EventChangedEvent.Updated, updatedEvent);
        return updatedEvent;
    }
    async addIncludeDate(id, date) {
        const dateToInclude = dayjs(date || undefined)
            .startOf('day')
            .toDate();
        const updatedSchedule = await this.scheduleService.addIncludeDate(id, dateToInclude);
        this.eventEmitter.emit(events_1.ScheduleChangedEvent.Updated, updatedSchedule);
    }
    async cloneSchedule(id) {
        return this.scheduleService.clone(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateScheduleDto]),
    __metadata("design:returntype", void 0)
], ScheduleController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('eligible/:date'),
    __param(0, (0, common_1.Param)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ScheduleController.prototype, "findEligibleSchedule", null);
__decorate([
    (0, common_1.Get)('active/:date'),
    __param(0, (0, common_1.Param)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ScheduleController.prototype, "findAllActiveSchedules", null);
__decorate([
    (0, common_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ScheduleController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('eligible'),
    __param(0, (0, common_1.Query)('from')),
    __param(1, (0, common_1.Query)('to')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ScheduleController.prototype, "findEligibleScheduleBetween", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ScheduleController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateScheduleDto]),
    __metadata("design:returntype", void 0)
], ScheduleController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ScheduleController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/event'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ScheduleController.prototype, "addEvent", null);
__decorate([
    (0, common_1.Delete)(':id/event/:eventId'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('eventId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ScheduleController.prototype, "removeEvent", null);
__decorate([
    (0, common_1.Put)(':id/event'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ScheduleController.prototype, "updateEvent", null);
__decorate([
    (0, common_1.Post)(':id/includeDates/:date'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ScheduleController.prototype, "addIncludeDate", null);
__decorate([
    (0, common_1.Post)(':id/clone'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ScheduleController.prototype, "cloneSchedule", null);
ScheduleController = __decorate([
    (0, common_1.Controller)('schedule'),
    __metadata("design:paramtypes", [schedule_service_1.ScheduleService,
        event_service_1.EventService,
        event_emitter_1.EventEmitter2])
], ScheduleController);
exports.ScheduleController = ScheduleController;
//# sourceMappingURL=schedule.controller.js.map