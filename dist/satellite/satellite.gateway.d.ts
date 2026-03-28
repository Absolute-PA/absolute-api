/// <reference types="node" />
import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { TriggerPlayDto } from './dto/trigger-play.dto';
export declare class SatelliteGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly logger;
    wss: Server;
    private readonly satelliteService;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleHeartbeat(client: Socket): void;
    handleTriggerPlay(dto: TriggerPlayDto): void;
    triggerPlay(targetId: string, url: string): void;
    forwardAudioChunk(targetId: string, chunk: Buffer): void;
    stopAudioStream(targetId: string): void;
}
