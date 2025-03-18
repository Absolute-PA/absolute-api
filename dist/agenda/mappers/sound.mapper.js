"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toPlaySoundCommand = void 0;
const toPlaySoundCommand = (dto) => {
    return {
        soundId: dto.attributes.soundId,
        durationInSecond: Number(dto.attributes.durationInSecond),
        audit: dto.audit,
    };
};
exports.toPlaySoundCommand = toPlaySoundCommand;
//# sourceMappingURL=sound.mapper.js.map