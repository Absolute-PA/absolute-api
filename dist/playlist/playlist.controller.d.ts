import { PlaylistService } from './playlist.service';
import { CreatePlaylistDto, UpdatePlaylistDto } from './dto';
export declare class PlaylistController {
    private readonly playlistService;
    constructor(playlistService: PlaylistService);
    create(createPlaylistDto: CreatePlaylistDto): Promise<import("./schemas").PlaylistDocument>;
    getPlaylists(): Promise<import("./dto").PlaylistDto[]>;
    getPlaylist(id: string): Promise<import("./dto").PlaylistDto>;
    update(id: string, updatePlaylistDto: UpdatePlaylistDto): Promise<import("./dto").PlaylistDto>;
    delete(id: string): Promise<import("./schemas").PlaylistDocument>;
    play(id: string): Promise<import("./dto").PlaylistDto>;
    stop(id: string): Promise<import("./dto").PlaylistDto>;
}
