import { SoundDocument } from '@/sound/schemas';
export declare class PlaylistDto {
    _id: string;
    name: string;
    sounds: SoundDocument[];
    isShuffle: boolean;
    jobId?: string;
    createdAtUtc: Date;
    updatedAtUtc: Date;
}
