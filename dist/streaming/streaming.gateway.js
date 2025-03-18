"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StreamingGateway = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
let StreamingGateway = class StreamingGateway {
    constructor() {
        this.logger = new common_1.Logger('MessageGateway');
    }
    afterInit(server) {
        this.logger.log('Initialized');
    }
    handleDisconnect(client) {
        const socketName = client.handshake.query.name;
    }
    handleConnection(client, ...args) {
        const socketName = client.handshake.query.name;
    }
    async handleError(err) {
        this.logger.error(err);
    }
    async handleServerPeerId(client, id) {
        this.wss.emit('serverPeerId', id);
    }
    async handleVolumeChange(volume) {
        this.wss.emit('volumeChange', volume);
        return volume;
    }
    async reconnectPeer() {
        this.wss.emit('reconnectPeerjs');
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], StreamingGateway.prototype, "wss", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('connect_error'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StreamingGateway.prototype, "handleError", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('serverPeerId'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", Promise)
], StreamingGateway.prototype, "handleServerPeerId", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('volume'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], StreamingGateway.prototype, "handleVolumeChange", null);
StreamingGateway = __decorate([
    (0, common_1.Injectable)(),
    (0, websockets_1.WebSocketGateway)({ cors: true })
], StreamingGateway);
exports.StreamingGateway = StreamingGateway;
//# sourceMappingURL=streaming.gateway.js.map