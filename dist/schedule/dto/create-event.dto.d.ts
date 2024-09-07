export declare class CreateEventDtoBase {
    name: string;
    time: string;
    jobType: string;
    durationInSecond?: number;
}
export declare class CreateEventPlaySoundDto extends CreateEventDtoBase {
    soundId: string;
}
export declare class CreateEventPlayMusicDto extends CreateEventDtoBase {
    playlistId: string;
}
export declare class CreateEventPlayVoiceRecordedDto extends CreateEventDtoBase {
    voiceId: string;
    durationInSecond?: number;
}
export declare class CreateEventPlayTextToAudioDto extends CreateEventDtoBase {
    textToAudioId: string;
    durationInSecond?: number;
}
export type CreateEventDto = CreateEventPlaySoundDto | CreateEventPlayMusicDto | CreateEventPlayVoiceRecordedDto | CreateEventPlayTextToAudioDto;
export declare const isCreateEventPlaySoundDto: (createEventDto: CreateEventDto) => createEventDto is CreateEventPlaySoundDto;
export declare const isCreateEventPlayMusicDto: (createEventDto: CreateEventDto) => createEventDto is CreateEventPlayMusicDto;
export declare const isCreateEventPlayVoiceRecodedDto: (createEventDto: CreateEventDto) => createEventDto is CreateEventPlayVoiceRecordedDto;
export declare const isCreateEventPlayTextToAudioDto: (createEventDto: CreateEventDto) => createEventDto is CreateEventPlayTextToAudioDto;
