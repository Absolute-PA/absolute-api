"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toPlayMusicCommand = void 0;
const toPlayMusicCommand = (dto) => {
    return {
        playlistId: dto.attributes.playlistId,
        durationInSecond: Number(dto.attributes.durationInSecond),
        audit: dto.audit,
    };
};
exports.toPlayMusicCommand = toPlayMusicCommand;
//# sourceMappingURL=music.mapper.js.map