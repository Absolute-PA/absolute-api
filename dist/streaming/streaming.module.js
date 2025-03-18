"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StreamingModule = void 0;
const common_1 = require("@nestjs/common");
const streaming_gateway_1 = require("./streaming.gateway");
const streaming_controller_1 = require("./streaming.controller");
const streaming_service_1 = require("./streaming.service");
const user_service_1 = require("../user/user.service");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("../user/schemas/user.schema");
const setting_module_1 = require("../setting/setting.module");
let StreamingModule = class StreamingModule {
};
StreamingModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'User', schema: user_schema_1.UserSchema }]),
            setting_module_1.SettingModule,
        ],
        controllers: [streaming_controller_1.StreamingController],
        providers: [streaming_gateway_1.StreamingGateway, streaming_service_1.StreamingService, user_service_1.UserService],
    })
], StreamingModule);
exports.StreamingModule = StreamingModule;
//# sourceMappingURL=streaming.module.js.map