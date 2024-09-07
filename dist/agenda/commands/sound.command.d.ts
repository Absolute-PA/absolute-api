import { JobCommand } from './common.command';
export interface PlaySoundCommand extends JobCommand {
    soundId: string;
    durationInSecond?: number;
}
export interface PlayVoiceCommand extends JobCommand {
    voiceId: string;
    durationInSecond?: number;
}
export interface PlayTextToAudioCommand extends JobCommand {
    textToAudioId: string;
    durationInSecond?: number;
}
