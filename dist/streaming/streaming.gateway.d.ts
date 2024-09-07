import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class StreamingGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private logger;
    wss: Server;
    afterInit(server: Server): void;
    handleDisconnect(client: Socket): void;
    handleConnection(client: Socket, ...args: any[]): void;
    handleError(err: any): Promise<void>;
    handleServerPeerId(client: Socket, id: string): Promise<void>;
    handleVolumeChange(volume: number): Promise<unknown>;
    reconnectPeer(): Promise<void>;
}
