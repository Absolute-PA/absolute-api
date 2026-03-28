/// <reference types="node" />
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SatelliteGateway } from '../satellite/satellite.gateway';
export declare class StreamingGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private readonly satelliteGateway;
    private logger;
    wss: Server;
    constructor(satelliteGateway: SatelliteGateway);
    afterInit(server: Server): void;
    handleDisconnect(client: Socket): void;
    handleConnection(client: Socket, ...args: any[]): void;
    handleError(err: any): Promise<void>;
    handleServerPeerId(client: Socket, id: string): Promise<void>;
    handleVolumeChange(volume: number): Promise<unknown>;
    handleAudioData(client: Socket, payload: {
        targetId: string;
        chunk: Buffer;
    }): void;
    handleAudioStreamStop(client: Socket, payload: {
        targetId: string;
    }): void;
    reconnectPeer(): Promise<void>;
}
