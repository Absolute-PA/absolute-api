"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCreateEventPlayTextToAudioDto = exports.isCreateEventPlayVoiceRecodedDto = exports.isCreateEventPlayMusicDto = exports.isCreateEventPlaySoundDto = exports.CreateEventPlayTextToAudioDto = exports.CreateEventPlayVoiceRecordedDto = exports.CreateEventPlayMusicDto = exports.CreateEventPlaySoundDto = exports.CreateEventDtoBase = void 0;
const enums_1 = require("@root/src/common/enums");
class CreateEventDtoBase {
}
exports.CreateEventDtoBase = CreateEventDtoBase;
class CreateEventPlaySoundDto extends CreateEventDtoBase {
}
exports.CreateEventPlaySoundDto = CreateEventPlaySoundDto;
class CreateEventPlayMusicDto extends CreateEventDtoBase {
}
exports.CreateEventPlayMusicDto = CreateEventPlayMusicDto;
class CreateEventPlayVoiceRecordedDto extends CreateEventDtoBase {
}
exports.CreateEventPlayVoiceRecordedDto = CreateEventPlayVoiceRecordedDto;
class CreateEventPlayTextToAudioDto extends CreateEventDtoBase {
}
exports.CreateEventPlayTextToAudioDto = CreateEventPlayTextToAudioDto;
const isCreateEventPlaySoundDto = (createEventDto) => {
    return createEventDto.jobType === enums_1.JobType.PlaySound;
};
exports.isCreateEventPlaySoundDto = isCreateEventPlaySoundDto;
const isCreateEventPlayMusicDto = (createEventDto) => {
    return createEventDto.jobType === enums_1.JobType.PlayMusic;
};
exports.isCreateEventPlayMusicDto = isCreateEventPlayMusicDto;
const isCreateEventPlayVoiceRecodedDto = (createEventDto) => {
    return createEventDto.jobType === enums_1.JobType.PlayVoiceRecorded;
};
exports.isCreateEventPlayVoiceRecodedDto = isCreateEventPlayVoiceRecodedDto;
const isCreateEventPlayTextToAudioDto = (createEventDto) => {
    return createEventDto.jobType === enums_1.JobType.PlayTextToAudio;
};
exports.isCreateEventPlayTextToAudioDto = isCreateEventPlayTextToAudioDto;
//# sourceMappingURL=create-event.dto.js.map