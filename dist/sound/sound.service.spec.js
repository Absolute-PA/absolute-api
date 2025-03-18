"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const sound_service_1 = require("./sound.service");
describe('SoundService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [sound_service_1.SoundService],
        }).compile();
        service = module.get(sound_service_1.SoundService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=sound.service.spec.js.map