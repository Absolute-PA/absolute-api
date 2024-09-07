/// <reference types="multer" />
import { Model } from 'mongoose';
import { AgendaService } from '@/agenda/agenda.service';
import { AuditActor } from '@/common/enums';
import { SoundEventPlayPayload, TextToAudioEventPlayPayload, VoiceRecordedEventPlayPayload } from '@/common/events/sound';
import { SoundDocument } from './schemas';
import { CreateSoundDto, UpdateSoundDto } from './dto';
import { SoundType } from './constants';
import { SoundGateway } from './sound.gateway';
import { UploadService } from '../upload/upload.service';
import { TextToAudioService } from '../text-to-audio/text-to-audio.service';
import { StreamingService } from '../streaming/streaming.service';
export declare class SoundService {
    private readonly soundModel;
    private readonly agendaService;
    private readonly uploadService;
    private readonly textToAudioService;
    private readonly streamingService;
    private soundGateway;
    private readonly logger;
    constructor(soundModel: Model<SoundDocument>, agendaService: AgendaService, uploadService: UploadService, textToAudioService: TextToAudioService, streamingService: StreamingService, soundGateway: SoundGateway);
    create(createSoundDto: CreateSoundDto): Promise<SoundDocument>;
    findByType(type: SoundType): Promise<SoundDocument[]>;
    findOne(id: string): Promise<SoundDocument>;
    findByIds(ids: string[]): Promise<SoundDocument[]>;
    update(id: string, updateSoundDto: UpdateSoundDto): Promise<SoundDocument>;
    updateVolume(id: string, updateSoundDto: UpdateSoundDto): Promise<SoundDocument>;
    delete(id: string): Promise<SoundDocument>;
    upload(id: string, file: Express.Multer.File): Promise<SoundDocument>;
    playSoundOnEvent(payload: SoundEventPlayPayload): Promise<void>;
    playVoiceRecorded(payload: VoiceRecordedEventPlayPayload): Promise<void>;
    playTextToAudioRecorded(payload: TextToAudioEventPlayPayload): Promise<void>;
    play(actor: AuditActor, id: string, isRepeat?: boolean): Promise<SoundDocument>;
    stop(id: string): Promise<SoundDocument>;
    resetTunes(): Promise<boolean>;
    private getNewFileName;
    private validateAndMoveFileAsync;
}
