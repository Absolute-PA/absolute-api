/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model } from 'mongoose';
import { SoundService } from '@/sound/sound.service';
import { PlaylistEventPlayPayload } from '@/common/events';
import { AgendaService } from '@/agenda/agenda.service';
import { PlaylistDocument } from './schemas';
import { CreatePlaylistDto, PlaylistDto, UpdatePlaylistDto } from './dto';
import { AuditActor } from '../common/enums';
import { SoundGateway } from '../sound/sound.gateway';
export declare class PlaylistService {
    private readonly playlistModel;
    private readonly soundService;
    private readonly agendaService;
    private soundGateway;
    private readonly logger;
    constructor(playlistModel: Model<PlaylistDocument>, soundService: SoundService, agendaService: AgendaService, soundGateway: SoundGateway);
    create(createPlaylistDto: CreatePlaylistDto): Promise<PlaylistDocument>;
    findAll(): Promise<PlaylistDto[]>;
    findOne(id: string): Promise<PlaylistDto>;
    update(id: string, updateDto: UpdatePlaylistDto): Promise<PlaylistDto>;
    delete(id: string): Promise<PlaylistDocument>;
    addSong(id: string, songId: string): Promise<import("./schemas").Playlist & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    removeSong(id: string, songId: string): Promise<import("./schemas").Playlist & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    play(actor: AuditActor, id: string): Promise<PlaylistDto>;
    stop(id: string): Promise<PlaylistDto>;
    playFromEvent(payload: PlaylistEventPlayPayload): Promise<void>;
}
