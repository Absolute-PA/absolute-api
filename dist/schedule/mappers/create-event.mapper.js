"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapCreateDtoToEventDocument = void 0;
const utils_1 = require("@/common/utils");
const dto_1 = require("../dto");
const mapCreateDtoToEventDocument = (createEventDto) => {
    const { name, time, jobType } = createEventDto, others = __rest(createEventDto, ["name", "time", "jobType"]);
    return {
        id: (0, utils_1.uuid)(),
        name,
        time,
        jobType,
        data: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, others), ((0, dto_1.isCreateEventPlaySoundDto)(createEventDto) && {
            soundId: createEventDto.soundId,
            durationInSecond: createEventDto.durationInSecond,
        })), ((0, dto_1.isCreateEventPlayMusicDto)(createEventDto) && {
            playlistId: createEventDto.playlistId,
        })), ((0, dto_1.isCreateEventPlayVoiceRecodedDto)(createEventDto) && {
            voiceId: createEventDto.voiceId,
            durationInSecond: createEventDto.durationInSecond,
        })), ((0, dto_1.isCreateEventPlayTextToAudioDto)(createEventDto) && {
            textToAudioId: createEventDto.textToAudioId,
            durationInSecond: createEventDto.durationInSecond,
        })),
    };
};
exports.mapCreateDtoToEventDocument = mapCreateDtoToEventDocument;
//# sourceMappingURL=create-event.mapper.js.map