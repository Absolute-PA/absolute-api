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
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3ExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const s3_service_1 = require("./s3.service");
let S3ExceptionFilter = class S3ExceptionFilter {
    constructor(s3Service) {
        this.s3Service = s3Service;
    }
    async catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        if (exception instanceof common_1.HttpException) {
            response.status(exception.getStatus()).json(exception.getResponse());
        }
        else {
            const timestamp = new Date().toISOString();
            const errorLog = `Exception occurred at ${timestamp}:\n${exception.stack}`;
            const bucketName = process.env.LOG_BUCKET_NAME;
            const piName = process.env.PI_NAME;
            const fileName = `exception-${piName}-${timestamp}.log`;
            try {
                const fileUrl = await this.s3Service.uploadFile(Buffer.from(errorLog), bucketName, fileName);
                console.error(`Exception logged and uploaded to S3: ${fileUrl}`);
            }
            catch (error) {
                console.error(`Failed to upload exception log to S3: ${error.message}`);
            }
            response.status(500).json({
                statusCode: 500,
                message: 'Internal Server Error',
            });
        }
    }
};
S3ExceptionFilter = __decorate([
    (0, common_1.Catch)(),
    __metadata("design:paramtypes", [s3_service_1.S3Service])
], S3ExceptionFilter);
exports.S3ExceptionFilter = S3ExceptionFilter;
//# sourceMappingURL=s3-exception-filter.js.map