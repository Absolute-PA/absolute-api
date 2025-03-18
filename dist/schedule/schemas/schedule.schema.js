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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleSchema = exports.Schedule = exports.WeekDay = void 0;
const mongoose_1 = require("@nestjs/mongoose");
var WeekDay;
(function (WeekDay) {
    WeekDay[WeekDay["Sunday"] = 0] = "Sunday";
    WeekDay[WeekDay["Monday"] = 1] = "Monday";
    WeekDay[WeekDay["Tuesday"] = 2] = "Tuesday";
    WeekDay[WeekDay["Wednesday"] = 3] = "Wednesday";
    WeekDay[WeekDay["Thursday"] = 4] = "Thursday";
    WeekDay[WeekDay["Friday"] = 5] = "Friday";
    WeekDay[WeekDay["Saturday"] = 6] = "Saturday";
})(WeekDay = exports.WeekDay || (exports.WeekDay = {}));
let Schedule = class Schedule {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Schedule.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Schedule.prototype, "color", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Schedule.prototype, "startDate", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Schedule.prototype, "endDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: Date }] }),
    __metadata("design:type", Array)
], Schedule.prototype, "excludeDates", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: Date }] }),
    __metadata("design:type", Array)
], Schedule.prototype, "includeDates", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], Schedule.prototype, "weekDays", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Schedule.prototype, "priority", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], Schedule.prototype, "events", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", Date)
], Schedule.prototype, "createdAtUtc", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", Date)
], Schedule.prototype, "updatedAtUtc", void 0);
Schedule = __decorate([
    (0, mongoose_1.Schema)()
], Schedule);
exports.Schedule = Schedule;
exports.ScheduleSchema = mongoose_1.SchemaFactory.createForClass(Schedule);
//# sourceMappingURL=schedule.schema.js.map