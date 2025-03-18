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
exports.ScheduleService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const dayjs = require("dayjs");
const utils_1 = require("../common/utils");
const schedulePrioritySort = (a, b) => dayjs(a.createdAtUtc).isAfter(dayjs(b.createdAtUtc)) ? -1 : 1;
let ScheduleService = class ScheduleService {
    constructor(scheduleModel) {
        this.scheduleModel = scheduleModel;
    }
    async create(createScheduleDto) {
        const newSchedule = new this.scheduleModel(createScheduleDto);
        return newSchedule.save();
    }
    async findAll() {
        const schedules = await this.scheduleModel.find().exec();
        return schedules;
    }
    async findOne(id) {
        const Schedule = await this.scheduleModel.findById(id);
        return Schedule;
    }
    async findEligibleSchedule(date) {
        const activeSchedules = await this.findAllActiveSchedules(date);
        const specificDaySchedules = activeSchedules
            .filter((s) => s.includeDates.length > 0 &&
            s.includeDates
                .map((item) => dayjs(item).format('YYYY-MM-DD'))
                .includes(dayjs(date).format('YYYY-MM-DD')))
            .sort(schedulePrioritySort);
        if (specificDaySchedules.length > 0) {
            return specificDaySchedules[0];
        }
        const weekdaySchedules = activeSchedules
            .filter((s) => s.weekDays.includes(date.getDay()))
            .sort(schedulePrioritySort);
        if (weekdaySchedules.length > 0) {
            return weekdaySchedules[0];
        }
        return null;
    }
    async findAllActiveSchedules(date) {
        const dateOnly = dayjs(date).startOf('day').toDate();
        const query = {
            $and: [
                {
                    $or: [
                        { startDate: { $lte: date }, endDate: { $gte: date } },
                        { startDate: { $lte: date }, endDate: null },
                        { startDate: null, endDate: { $gte: date } },
                    ],
                },
                { excludeDates: { $nin: [dateOnly] } },
            ],
        };
        const schedules = await this.scheduleModel.find(query).exec();
        return schedules;
    }
    async findEligibleScheduleBetween(startDate, endDate) {
        const date = new Date(startDate);
        const eligibleSchedules = {};
        while (date <= endDate) {
            const eligibleSchedule = await this.findEligibleSchedule(date);
            if (eligibleSchedule) {
                eligibleSchedules[dayjs(date).format('YYYY-MM-DD')] = eligibleSchedule;
            }
            date.setDate(date.getDate() + 1);
        }
        return eligibleSchedules;
    }
    async update(id, updateScheduleDto) {
        const updatedSchedule = await this.scheduleModel
            .findByIdAndUpdate(id, Object.assign(Object.assign({}, updateScheduleDto), { updatedAtUtc: new Date() }), { new: true })
            .exec();
        if (updatedSchedule.includeDates) {
            await this.removeOtherExistingIncludeDates(id, updatedSchedule.includeDates);
        }
        return updatedSchedule;
    }
    async remove(id) {
        const deletedSchedule = await this.scheduleModel
            .findByIdAndDelete(id)
            .exec();
        return deletedSchedule;
    }
    async addIncludeDate(scheduleId, dateToInclude) {
        const schedule = await this.findOne(scheduleId);
        if (schedule.includeDates.findIndex((d) => d.getTime() === dateToInclude.getTime()) === -1) {
            schedule.includeDates.push(dateToInclude);
        }
        const updatedSchedule = await schedule.save();
        await this.removeOtherExistingIncludeDates(scheduleId, [dateToInclude]);
        return updatedSchedule;
    }
    async removeOtherExistingIncludeDates(id, includeDates) {
        const schedulesHaveSameIncludeDates = await this.scheduleModel
            .find({
            _id: { $ne: id },
            includeDates: { $in: includeDates },
        })
            .exec();
        const includeDatesString = includeDates.map((d) => d.toISOString());
        await Promise.all(schedulesHaveSameIncludeDates.map((s) => {
            const newIncludeDates = s.includeDates.filter((d) => !includeDatesString.includes(d.toISOString()));
            s.includeDates = newIncludeDates;
            s.updatedAtUtc = new Date();
            return s.save();
        }));
    }
    async clone(id) {
        const schedule = await this.findOne(id);
        const events = schedule.events.map((e) => (Object.assign(Object.assign({}, e), { id: (0, utils_1.uuid)() })));
        const newSchedule = new this.scheduleModel(Object.assign(Object.assign({}, schedule.toObject()), { events, _id: undefined, createdAtUtc: new Date(), updatedAtUtc: new Date() }));
        return newSchedule.save();
    }
};
ScheduleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Schedule')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ScheduleService);
exports.ScheduleService = ScheduleService;
//# sourceMappingURL=schedule.service.js.map