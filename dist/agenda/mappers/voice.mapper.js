"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toPlayVoiceCommand = void 0;
const toPlayVoiceCommand = (dto) => {
    return {
        voiceId: dto.attributes.voiceId,
        durationInSecond: Number(dto.attributes.durationInSecond),
        audit: dto.audit,
    };
};
exports.toPlayVoiceCommand = toPlayVoiceCommand;
//# sourceMappingURL=voice.mapper.js.map