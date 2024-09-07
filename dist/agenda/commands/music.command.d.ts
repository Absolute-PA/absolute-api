import { JobCommand } from './common.command';
export interface PlayMusicCommand extends JobCommand {
    playlistId: string;
}
