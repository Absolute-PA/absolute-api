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
exports.mapUpdateDtoToEventDocument = void 0;
const dto_1 = require("../dto");
const mapUpdateDtoToEventDocument = (updateEventDto) => {
    const { id, name, time, jobType } = updateEventDto, others = __rest(updateEventDto, ["id", "name", "time", "jobType"]);
    return {
        id,
        name,
        time,
        jobType,
        data: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, others), ((0, dto_1.isUpdateEventPlaySoundDto)(updateEventDto) && {
            soundId: updateEventDto.soundId,
            durationInSecond: updateEventDto.durationInSecond,
        })), ((0, dto_1.isUpdateEventPlayMusicDto)(updateEventDto) && {
            playlistId: updateEventDto.playlistId,
        })), ((0, dto_1.isUpdateEventPlayVoiceRecordedDto)(updateEventDto) && {
            voiceId: updateEventDto.voiceId,
            durationInSecond: updateEventDto.durationInSecond,
        })), ((0, dto_1.isUpdateEventPlayTextToAudioDto)(updateEventDto) && {
            textToAudioId: updateEventDto.textToAudioId,
            durationInSecond: updateEventDto.durationInSecond,
        })),
    };
};
exports.mapUpdateDtoToEventDocument = mapUpdateDtoToEventDocument;
//# sourceMappingURL=update-event.mapper.js.map