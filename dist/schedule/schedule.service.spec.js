"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const schedule_service_1 = require("./schedule.service");
describe('ScheduleService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [schedule_service_1.ScheduleService],
        }).compile();
        service = module.get(schedule_service_1.ScheduleService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=schedule.service.spec.js.map