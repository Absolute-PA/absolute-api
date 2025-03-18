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
exports.EventService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let EventService = class EventService {
    constructor(scheduleModel) {
        this.scheduleModel = scheduleModel;
    }
    async addEvent(id, event) {
        const schedule = await this.scheduleModel.findById(id).exec();
        schedule.events.push(event);
        schedule.updatedAtUtc = new Date();
        return schedule.save();
    }
    async removeEvent(id, eventId) {
        const schedule = await this.scheduleModel.findById(id).exec();
        schedule.events = schedule.events.filter((e) => e.id !== eventId);
        schedule.updatedAtUtc = new Date();
        return schedule.save();
    }
    async updateEvent(id, event) {
        const schedule = await this.scheduleModel.findById(id).exec();
        const index = schedule.events.findIndex((e) => e.id === event.id);
        schedule.events[index] = event;
        schedule.updatedAtUtc = new Date();
        return schedule.save();
    }
};
EventService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Schedule')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], EventService);
exports.EventService = EventService;
//# sourceMappingURL=event.service.js.map