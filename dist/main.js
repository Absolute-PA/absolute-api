"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const nest_winston_1 = require("nest-winston");
const winston_1 = require("winston");
const peer_1 = require("peer");
const fs = require("fs");
require("winston-daily-rotate-file");
const path_1 = require("path");
const app_module_1 = require("./app.module");
const WinstonCloudWatch = require('winston-cloudwatch');
const PI_NAME = process.env.PI_NAME || 'PI';
async function bootstrap() {
    const httpsOptions = {
        key: fs.readFileSync((0, path_1.join)(process.cwd(), './certificates/localhost.key')),
        cert: fs.readFileSync((0, path_1.join)(process.cwd(), './certificates/localhost.crt')),
    };
    const logTransports = [
        new winston_1.transports.DailyRotateFile({
            filename: `blob/logs/${PI_NAME}-%DATE%-error.log`,
            level: 'error',
            format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.json()),
            datePattern: 'YYYY-MM-DD',
            zippedArchive: false,
            maxFiles: process.env.NODE_ENV === 'production' ? '90d' : '30d',
        }),
        new winston_1.transports.DailyRotateFile({
            filename: `blob/logs/${PI_NAME}-%DATE%-combined.log`,
            format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.json()),
            datePattern: 'YYYY-MM-DD',
            zippedArchive: false,
            maxFiles: process.env.NODE_ENV === 'production' ? '90d' : '30d',
        }),
        new winston_1.transports.Console({
            format: winston_1.format.combine(winston_1.format.cli(), winston_1.format.splat(), winston_1.format.timestamp(), winston_1.format.errors({ stack: true }), winston_1.format.printf((info) => {
                return `${info.timestamp} ${info.level}: ${info.message}`;
            })),
        }),
    ];
    if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'qa') {
        logTransports.push(new WinstonCloudWatch({
            logGroupName: process.env.LOG_GROUP_NAME || 'pi-logs',
            logStreamName: PI_NAME,
            awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
            awsSecretKey: process.env.AWS_SECRET_ACCESS_KEY,
            awsRegion: process.env.AWS_REGION,
        }));
    }
    const appOption = {
        httpsOptions: process.env.HTTPS === 'true' ? httpsOptions : undefined,
        logger: nest_winston_1.WinstonModule.createLogger({
            transports: logTransports,
        }),
    };
    const app = await core_1.NestFactory.create(app_module_1.AppModule, appOption);
    process.on('uncaughtException', function (exception) {
        console.log(exception);
    });
    app.enableCors();
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Absolute PA application')
        .setDescription('The Absolute PA API description')
        .setVersion('1.0')
        .addTag('PA')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    const httpServer = app.getHttpServer();
    const peerServer = (0, peer_1.ExpressPeerServer)(httpServer, {
        path: '/streaming',
    });
    app.use('/peer', peerServer);
    const port = process.env.PORT || 8080;
    await app.listen(port);
    console.log('App listening on port: ' + port);
}
bootstrap();
//# sourceMappingURL=main.js.map