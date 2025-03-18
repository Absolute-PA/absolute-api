"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextToAudioModule = void 0;
const common_1 = require("@nestjs/common");
const text_to_audio_controller_1 = require("./text-to-audio.controller");
const text_to_audio_service_1 = require("./text-to-audio.service");
const streaming_service_1 = require("@root/src/streaming/streaming.service");
const mongoose_1 = require("@nestjs/mongoose");
const message_schema_1 = require("./schemas/message.schema");
const streaming_gateway_1 = require("../streaming/streaming.gateway");
const user_service_1 = require("../user/user.service");
const user_schema_1 = require("../user/schemas/user.schema");
const setting_module_1 = require("../setting/setting.module");
let TextToAudioModule = class TextToAudioModule {
};
TextToAudioModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'Message', schema: message_schema_1.MessageSchema },
                { name: 'User', schema: user_schema_1.UserSchema },
            ]),
            setting_module_1.SettingModule,
        ],
        controllers: [text_to_audio_controller_1.TextToAudioController],
        providers: [
            text_to_audio_service_1.TextToAudioService,
            streaming_service_1.StreamingService,
            streaming_gateway_1.StreamingGateway,
            user_service_1.UserService,
        ],
    })
], TextToAudioModule);
exports.TextToAudioModule = TextToAudioModule;
//# sourceMappingURL=text-to-audio.module.js.map