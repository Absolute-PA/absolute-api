import { SoundDocument } from '@/sound/schemas';
import { PlaylistDocument } from '../schemas';
import { PlaylistDto } from '../dto';
export declare const mapToDto: (playlist: PlaylistDocument, sounds: SoundDocument[]) => PlaylistDto;
