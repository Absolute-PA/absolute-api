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
var StreamingController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StreamingController = void 0;
const common_1 = require("@nestjs/common");
const path_1 = require("path");
const streaming_service_1 = require("./streaming.service");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const role_enum_1 = require("../auth/enums/role.enum");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
let StreamingController = StreamingController_1 = class StreamingController {
    constructor(audioService) {
        this.audioService = audioService;
        this.logger = new common_1.Logger(StreamingController_1.name);
    }
    async playAudioFile(filePath, res) {
        try {
            const fullFilePath = (0, path_1.join)(process.cwd(), filePath);
            const audioStream = this.audioService.createStreamFromFile(fullFilePath);
            this.audioService.playStreamAudio(audioStream);
            res.send('Success play sound: ' + fullFilePath);
        }
        catch (error) {
            this.logger.log(error, 'error');
            return '';
        }
    }
    async startStreaming() {
        try {
            this.audioService.openServerUIStream();
        }
        catch (error) {
            this.logger.log(error);
        }
    }
    async stopStreamAudio(res) {
        this.audioService.stopStreamAudio();
    }
};
__decorate([
    (0, common_1.Post)('/play/'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.User, role_enum_1.Role.Viewer),
    __param(0, (0, common_1.Query)('filePath')),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], StreamingController.prototype, "playAudioFile", null);
__decorate([
    (0, common_1.Get)('stream/start'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.User, role_enum_1.Role.Viewer),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StreamingController.prototype, "startStreaming", null);
__decorate([
    (0, common_1.Get)('/stop'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.User, role_enum_1.Role.Viewer),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StreamingController.prototype, "stopStreamAudio", null);
StreamingController = StreamingController_1 = __decorate([
    (0, common_1.Controller)('audio'),
    __metadata("design:paramtypes", [streaming_service_1.StreamingService])
], StreamingController);
exports.StreamingController = StreamingController;
//# sourceMappingURL=streaming.controller.js.map