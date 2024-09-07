/// <reference types="multer" />
import { SoundService } from './sound.service';
import { CreateSoundDto, UpdateSoundDto } from './dto';
export declare class SoundController {
    private readonly soundService;
    constructor(soundService: SoundService);
    create(createSoundDto: CreateSoundDto): Promise<import("./schemas").SoundDocument>;
    uploadById(file: Express.Multer.File, id: string): Promise<import("./schemas").SoundDocument>;
    uploadByType(file: Express.Multer.File, type: string): Promise<import("./schemas").SoundDocument>;
    findTunes(): Promise<import("./schemas").SoundDocument[]>;
    findSongs(): Promise<import("./schemas").SoundDocument[]>;
    update(id: string, updateSoundDto: UpdateSoundDto): Promise<import("./schemas").SoundDocument>;
    updateVolume(id: string, updateSoundDto: UpdateSoundDto): Promise<import("./schemas").SoundDocument>;
    delete(id: string): Promise<import("./schemas").SoundDocument>;
    play(id: string, repeat: string): Promise<import("./schemas").SoundDocument>;
    stop(id: string): Promise<import("./schemas").SoundDocument>;
    resetTunes(): Promise<boolean>;
}
