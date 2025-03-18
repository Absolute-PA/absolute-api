"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const setting_controller_1 = require("./setting.controller");
describe('SettingController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [setting_controller_1.SettingController],
        }).compile();
        controller = module.get(setting_controller_1.SettingController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=setting.controller.spec.js.map