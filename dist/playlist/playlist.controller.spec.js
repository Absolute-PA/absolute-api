"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const playlist_controller_1 = require("./playlist.controller");
describe('PlaylistController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [playlist_controller_1.PlaylistController],
        }).compile();
        controller = module.get(playlist_controller_1.PlaylistController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=playlist.controller.spec.js.map