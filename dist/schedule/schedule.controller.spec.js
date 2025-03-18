"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const schedule_controller_1 = require("./schedule.controller");
const schedule_service_1 = require("./schedule.service");
describe('ScheduleController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [schedule_controller_1.ScheduleController],
            providers: [schedule_service_1.ScheduleService],
        }).compile();
        controller = module.get(schedule_controller_1.ScheduleController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=schedule.controller.spec.js.map