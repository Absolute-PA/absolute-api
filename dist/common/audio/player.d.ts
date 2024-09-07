import { Logger } from '@nestjs/common';
export interface PlayerOption {
    players?: string[];
    player?: string;
}
export default class Player {
    private opts;
    private logger;
    players: string[];
    player: string;
    constructor(opts: PlayerOption, logger: Logger);
    play(what: any, options: any, next?: (error: any) => any): any;
}
