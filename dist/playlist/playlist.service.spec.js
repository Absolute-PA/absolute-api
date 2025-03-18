"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const playlist_service_1 = require("./playlist.service");
describe('PlaylistService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [playlist_service_1.PlaylistService],
        }).compile();
        service = module.get(playlist_service_1.PlaylistService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=playlist.service.spec.js.map