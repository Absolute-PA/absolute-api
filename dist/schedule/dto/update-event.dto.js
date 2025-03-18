"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUpdateEventPlayTextToAudioDto = exports.isUpdateEventPlayVoiceRecordedDto = exports.isUpdateEventPlayMusicDto = exports.isUpdateEventPlaySoundDto = exports.UpdateEventPlayTextToAudioDto = exports.UpdateEventPlayVoiceRecodedDto = exports.UpdateEventPlayMusicDto = exports.UpdateEventPlaySoundDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_event_dto_1 = require("./create-event.dto");
const enums_1 = require("@root/src/common/enums");
class UpdateEventPlaySoundDto extends (0, swagger_1.PartialType)(create_event_dto_1.CreateEventPlaySoundDto) {
}
exports.UpdateEventPlaySoundDto = UpdateEventPlaySoundDto;
class UpdateEventPlayMusicDto extends (0, swagger_1.PartialType)(create_event_dto_1.CreateEventPlayMusicDto) {
}
exports.UpdateEventPlayMusicDto = UpdateEventPlayMusicDto;
class UpdateEventPlayVoiceRecodedDto extends (0, swagger_1.PartialType)(create_event_dto_1.CreateEventPlayVoiceRecordedDto) {
}
exports.UpdateEventPlayVoiceRecodedDto = UpdateEventPlayVoiceRecodedDto;
class UpdateEventPlayTextToAudioDto extends (0, swagger_1.PartialType)(create_event_dto_1.CreateEventPlayTextToAudioDto) {
}
exports.UpdateEventPlayTextToAudioDto = UpdateEventPlayTextToAudioDto;
const isUpdateEventPlaySoundDto = (updateEventDto) => {
    return updateEventDto.jobType === enums_1.JobType.PlaySound;
};
exports.isUpdateEventPlaySoundDto = isUpdateEventPlaySoundDto;
const isUpdateEventPlayMusicDto = (updateEventDto) => {
    return updateEventDto.jobType === enums_1.JobType.PlayMusic;
};
exports.isUpdateEventPlayMusicDto = isUpdateEventPlayMusicDto;
const isUpdateEventPlayVoiceRecordedDto = (updateEventDto) => {
    return updateEventDto.jobType === enums_1.JobType.PlayVoiceRecorded;
};
exports.isUpdateEventPlayVoiceRecordedDto = isUpdateEventPlayVoiceRecordedDto;
const isUpdateEventPlayTextToAudioDto = (updateEventDto) => {
    return updateEventDto.jobType === enums_1.JobType.PlayTextToAudio;
};
exports.isUpdateEventPlayTextToAudioDto = isUpdateEventPlayTextToAudioDto;
//# sourceMappingURL=update-event.dto.js.map