export declare enum SoundEvent {
    Play = "sound.play",
    VoiceRecorded = "voiceRecorded",
    TextToAudio = "TextToAudio"
}
export interface SoundEventPlayPayload {
    jobId: string;
    soundId: string;
    durationInSecond?: number;
}
export interface VoiceRecordedEventPlayPayload {
    jobId: string;
    voiceId: string;
    durationInSecond?: number;
}
export interface TextToAudioEventPlayPayload {
    jobId: string;
    textToAudioId: string;
    durationInSecond?: number;
}
