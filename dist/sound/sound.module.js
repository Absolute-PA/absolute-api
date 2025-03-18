"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoundModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const agenda_module_1 = require("@/agenda/agenda.module");
const setting_module_1 = require("@/setting/setting.module");
const sound_service_1 = require("./sound.service");
const sound_controller_1 = require("./sound.controller");
const schemas_1 = require("./schemas");
const sound_gateway_1 = require("./sound.gateway");
const upload_service_1 = require("../upload/upload.service");
const upload_schema_1 = require("../upload/schemas/upload.schema");
const streaming_service_1 = require("../streaming/streaming.service");
const text_to_audio_service_1 = require("../text-to-audio/text-to-audio.service");
const message_schema_1 = require("../text-to-audio/schemas/message.schema");
const user_service_1 = require("../user/user.service");
const user_schema_1 = require("../user/schemas/user.schema");
const streaming_gateway_1 = require("../streaming/streaming.gateway");
let SoundModule = class SoundModule {
};
SoundModule = __decorate([
    (0, common_1.Module)({
        imports: [
            agenda_module_1.AgendaModule,
            setting_module_1.SettingModule,
            mongoose_1.MongooseModule.forFeature([
                { name: 'Sound', schema: schemas_1.SoundSchema },
                { name: 'Upload', schema: upload_schema_1.UploadSchema },
                { name: 'Message', schema: message_schema_1.MessageSchema },
                { name: 'User', schema: user_schema_1.UserSchema },
            ]),
        ],
        providers: [
            sound_service_1.SoundService,
            sound_gateway_1.SoundGateway,
            upload_service_1.UploadService,
            text_to_audio_service_1.TextToAudioService,
            streaming_service_1.StreamingService,
            user_service_1.UserService,
            streaming_gateway_1.StreamingGateway,
        ],
        controllers: [sound_controller_1.SoundController],
        exports: [sound_service_1.SoundService, sound_gateway_1.SoundGateway],
    })
], SoundModule);
exports.SoundModule = SoundModule;
//# sourceMappingURL=sound.module.js.map