"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoiceModule = void 0;
const common_1 = require("@nestjs/common");
const voice_controller_1 = require("./voice.controller");
const voice_service_1 = require("./voice.service");
const upload_service_1 = require("../upload/upload.service");
const mongoose_1 = require("@nestjs/mongoose");
const upload_schema_1 = require("../upload/schemas/upload.schema");
const audio_player_1 = require("../common/audio/audio-player");
let VoiceModule = class VoiceModule {
};
VoiceModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'Upload', schema: upload_schema_1.UploadSchema }]),
        ],
        controllers: [voice_controller_1.VoiceController],
        providers: [voice_service_1.VoiceService, upload_service_1.UploadService, audio_player_1.AudioPlayer],
    })
], VoiceModule);
exports.VoiceModule = VoiceModule;
//# sourceMappingURL=voice.module.js.map