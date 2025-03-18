"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const setting_service_1 = require("./setting.service");
describe('SettingService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [setting_service_1.SettingService],
        }).compile();
        service = module.get(setting_service_1.SettingService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=setting.service.spec.js.map