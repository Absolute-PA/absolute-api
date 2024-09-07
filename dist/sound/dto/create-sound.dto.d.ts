import { SoundType } from '../constants';
export declare class CreateSoundDto {
    name: string;
    type: SoundType;
    fileName?: string;
    volume?: number;
    isDefault?: boolean;
}
