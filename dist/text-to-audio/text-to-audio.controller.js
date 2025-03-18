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
var TextToAudioController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextToAudioController = void 0;
const common_1 = require("@nestjs/common");
const text_to_audio_service_1 = require("./text-to-audio.service");
const text_dto_1 = require("./dtos/text.dto");
const streaming_service_1 = require("@root/src/streaming/streaming.service");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const role_enum_1 = require("../auth/enums/role.enum");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const saveStreamToFile_1 = require("./saveStreamToFile");
const path = require("path");
const path_1 = require("../common/path");
const constants_1 = require("../common/constants");
const file_1 = require("../common/file");
const audio_player_1 = require("../common/audio/audio-player");
let TextToAudioController = TextToAudioController_1 = class TextToAudioController {
    constructor(textToAudioService, streamingService) {
        this.textToAudioService = textToAudioService;
        this.streamingService = streamingService;
        this.logger = new common_1.Logger(TextToAudioController_1.name);
    }
    async playAudioFile(res, text) {
        try {
            const message = text.text;
            if (!message) {
                res.send('There is no message to play');
                return;
            }
            const { id, volume } = await this.textToAudioService.saveMessage(message);
            if (!(0, file_1.isFileExist)(constants_1.AUDIO_TO_MESSAGE_DIR)) {
                (0, file_1.createFolder)(constants_1.AUDIO_TO_MESSAGE_DIR);
            }
            const textToAudioPath = path.join(path_1.processRootPath, constants_1.AUDIO_TO_MESSAGE_DIR);
            const audioPath = textToAudioPath + '/' + id + '.wav';
            if (!(0, file_1.isFileExist)(audioPath)) {
                await this.textToAudioService.textToAudio(text.text, async (stream) => {
                    await (0, saveStreamToFile_1.saveStreamToFile)(stream, textToAudioPath + '/' + id + '.wav');
                    audio_player_1.AudioPlayer.play(audioPath, volume !== null && volume !== void 0 ? volume : 50);
                });
            }
            else {
                audio_player_1.AudioPlayer.play(audioPath, volume !== null && volume !== void 0 ? volume : 50);
            }
            res.send(`Success play text to audio: ${text.text}`);
        }
        catch (error) {
            this.logger.log(error, 'error');
            return '';
        }
    }
    async saveMessage(res, text) {
        try {
            const message = text.text;
            if (!message) {
                res.send('There is no message to play');
                return;
            }
            await this.textToAudioService.saveMessage(message);
            res.send(`Success save text: ${text.text}`);
        }
        catch (error) {
            this.logger.log(error, 'error ');
            return '';
        }
    }
    async getAllMessage() {
        try {
            const messages = await this.textToAudioService.getMessages();
            return messages !== null && messages !== void 0 ? messages : [];
        }
        catch (error) {
            this.logger.log(error, 'error');
            return '';
        }
    }
    deleteTextMessage(id) {
        return this.textToAudioService.deleteTextMessage(id);
    }
    updateTextMessage(id, text) {
        var _a;
        return this.textToAudioService.updateTextMessage(id, Object.assign(Object.assign({}, text), { volume: (_a = text.volume) !== null && _a !== void 0 ? _a : 50 }));
    }
};
__decorate([
    (0, common_1.Post)('/'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.User),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, text_dto_1.TextDTO]),
    __metadata("design:returntype", Promise)
], TextToAudioController.prototype, "playAudioFile", null);
__decorate([
    (0, common_1.Post)('saveMessage'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.User),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, text_dto_1.TextDTO]),
    __metadata("design:returntype", Promise)
], TextToAudioController.prototype, "saveMessage", null);
__decorate([
    (0, common_1.Get)('/message'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.User),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TextToAudioController.prototype, "getAllMessage", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.User),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TextToAudioController.prototype, "deleteTextMessage", null);
__decorate([
    (0, common_1.Put)('/:id'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.User),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, text_dto_1.TextDTO]),
    __metadata("design:returntype", void 0)
], TextToAudioController.prototype, "updateTextMessage", null);
TextToAudioController = TextToAudioController_1 = __decorate([
    (0, common_1.Controller)('textToAudio'),
    __metadata("design:paramtypes", [text_to_audio_service_1.TextToAudioService,
        streaming_service_1.StreamingService])
], TextToAudioController);
exports.TextToAudioController = TextToAudioController;
//# sourceMappingURL=text-to-audio.controller.js.map