"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const sound_controller_1 = require("./sound.controller");
describe('SoundController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [sound_controller_1.SoundController],
        }).compile();
        controller = module.get(sound_controller_1.SoundController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=sound.controller.spec.js.map