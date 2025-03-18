"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toPlayTextToAudioCommand = void 0;
const toPlayTextToAudioCommand = (dto) => {
    return {
        textToAudioId: dto.attributes.textToAudioId,
        durationInSecond: Number(dto.attributes.durationInSecond),
        audit: dto.audit,
    };
};
exports.toPlayTextToAudioCommand = toPlayTextToAudioCommand;
//# sourceMappingURL=textToAudio.mapper.js.map