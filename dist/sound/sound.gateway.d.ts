import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class SoundGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private logger;
    wss: Server;
    afterInit(server: Server): void;
    handleDisconnect(client: Socket): void;
    handleConnection(client: Socket, ...args: any[]): void;
    broadcastPlaying(data: {
        id: string;
        isPlaying: boolean;
    }): Promise<void>;
}
