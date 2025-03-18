"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwsModule = void 0;
const common_1 = require("@nestjs/common");
const s3_service_1 = require("./s3/s3.service");
const AWS = require("aws-sdk");
let AwsModule = class AwsModule {
};
AwsModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [
            {
                provide: 'AWS_SDK_CONFIG',
                useFactory: () => ({
                    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
                    region: process.env.AWS_REGION,
                }),
            },
            {
                provide: AWS.S3,
                useFactory: (config) => {
                    AWS.config.update(config);
                    return new AWS.S3();
                },
                inject: ['AWS_SDK_CONFIG'],
            },
            s3_service_1.S3Service,
        ],
    })
], AwsModule);
exports.AwsModule = AwsModule;
//# sourceMappingURL=aws.module.js.map