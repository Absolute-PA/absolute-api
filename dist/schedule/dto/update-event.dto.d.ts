import { CreateEventPlaySoundDto, CreateEventPlayMusicDto, CreateEventPlayVoiceRecordedDto, CreateEventPlayTextToAudioDto } from './create-event.dto';
declare const UpdateEventPlaySoundDto_base: import("@nestjs/common").Type<Partial<CreateEventPlaySoundDto>>;
export declare class UpdateEventPlaySoundDto extends UpdateEventPlaySoundDto_base {
    id: string;
}
declare const UpdateEventPlayMusicDto_base: import("@nestjs/common").Type<Partial<CreateEventPlayMusicDto>>;
export declare class UpdateEventPlayMusicDto extends UpdateEventPlayMusicDto_base {
    id: string;
}
declare const UpdateEventPlayVoiceRecodedDto_base: import("@nestjs/common").Type<Partial<CreateEventPlayVoiceRecordedDto>>;
export declare class UpdateEventPlayVoiceRecodedDto extends UpdateEventPlayVoiceRecodedDto_base {
    id: string;
}
declare const UpdateEventPlayTextToAudioDto_base: import("@nestjs/common").Type<Partial<CreateEventPlayTextToAudioDto>>;
export declare class UpdateEventPlayTextToAudioDto extends UpdateEventPlayTextToAudioDto_base {
    id: string;
}
export type UpdateEventDto = UpdateEventPlaySoundDto | UpdateEventPlayMusicDto | UpdateEventPlayTextToAudioDto | UpdateEventPlayVoiceRecodedDto;
export declare const isUpdateEventPlaySoundDto: (updateEventDto: UpdateEventDto) => updateEventDto is UpdateEventPlaySoundDto;
export declare const isUpdateEventPlayMusicDto: (updateEventDto: UpdateEventDto) => updateEventDto is UpdateEventPlayMusicDto;
export declare const isUpdateEventPlayVoiceRecordedDto: (updateEventDto: UpdateEventDto) => updateEventDto is UpdateEventPlayVoiceRecodedDto;
export declare const isUpdateEventPlayTextToAudioDto: (updateEventDto: UpdateEventDto) => updateEventDto is UpdateEventPlayTextToAudioDto;
export {};
