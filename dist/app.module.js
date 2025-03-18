"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const event_emitter_1 = require("@nestjs/event-emitter");
const serve_static_1 = require("@nestjs/serve-static");
const core_1 = require("@nestjs/core");
const path_1 = require("path");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const product_module_1 = require("./product/product.module");
const user_module_1 = require("./user/user.module");
const auth_module_1 = require("./auth/auth.module");
const cart_module_1 = require("./cart/cart.module");
const streaming_module_1 = require("./streaming/streaming.module");
const text_to_audio_module_1 = require("./text-to-audio/text-to-audio.module");
const agenda_module_1 = require("./agenda/agenda.module");
const schedule_module_1 = require("./schedule/schedule.module");
const sound_module_1 = require("./sound/sound.module");
const upload_module_1 = require("./upload/upload.module");
const voice_module_1 = require("./voice/voice.module");
const setting_module_1 = require("./setting/setting.module");
const playlist_module_1 = require("./playlist/playlist.module");
const core_module_1 = require("./core.module");
const aws_module_1 = require("./aws/aws.module");
const app_exception_filter_1 = require("./common/exception/app-exception-filter");
const audit_module_1 = require("./audit/audit.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRoot(process.env.NODEWEB_DB_URL),
            event_emitter_1.EventEmitterModule.forRoot(),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'assets'),
                serveRoot: '/assets',
                serveStaticOptions: {
                    index: false,
                },
            }),
            product_module_1.ProductModule,
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            cart_module_1.CartModule,
            streaming_module_1.StreamingModule,
            user_module_1.UserModule,
            text_to_audio_module_1.TextToAudioModule,
            schedule_module_1.ScheduleModule,
            agenda_module_1.AgendaModule,
            sound_module_1.SoundModule,
            upload_module_1.UploadModule,
            voice_module_1.VoiceModule,
            setting_module_1.SettingModule,
            playlist_module_1.PlaylistModule,
            core_module_1.CoreModule,
            aws_module_1.AwsModule,
            audit_module_1.AuditModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            { provide: core_1.APP_FILTER, useClass: app_exception_filter_1.AppExceptionFilter },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map