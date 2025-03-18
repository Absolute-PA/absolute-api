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
var StreamingService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StreamingService = void 0;
const common_1 = require("@nestjs/common");
const child_process_1 = require("child_process");
const fs_1 = require("fs");
const puppeteer_1 = require("../helpers/puppeteer");
const streaming_gateway_1 = require("./streaming.gateway");
const user_service_1 = require("../user/user.service");
const jwt_1 = require("@nestjs/jwt");
let StreamingService = StreamingService_1 = class StreamingService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.logger = new common_1.Logger(StreamingService_1.name);
    }
    spawnMpgPlayer() {
        if (!this.childProcess)
            this.childProcess = (0, child_process_1.spawn)('mpg123', ['-']);
    }
    async playStreamAudio(stream) {
        this.spawnMpgPlayer();
        stream.pipe(this.childProcess.stdin);
        this.childProcess.stdout.on('error', (err) => {
            if (err.code == 'EPIPE') {
                process.exit(0);
            }
        });
        this.childProcess.stdin.on('error', (error) => {
            this.logger.log(error);
        });
        this.childProcess.stdout.on('data', (data) => {
            this.logger.log('stdout data: ' + data);
        });
        this.childProcess.stderr.on('data', (data) => {
            this.logger.log('stderr data: ' + data);
        });
        this.childProcess.on('exit', (code) => {
            this.logger.log('exit');
            this.childProcess.kill();
            this.childProcess = null;
            if (code !== 0) {
                this.logger.log('grep process exited with code ' + code);
            }
        });
        return;
    }
    playStreamAudioAsync(stream) {
        const promise = new Promise((resolve, reject) => {
            this.spawnMpgPlayer();
            stream.pipe(this.childProcess.stdin);
            this.childProcess.stdout.on('error', (err) => {
                if (err.code == 'EPIPE') {
                    process.exit(0);
                }
            });
            this.childProcess.stdin.on('error', (error) => {
                this.logger.log(error);
            });
            this.childProcess.stdout.on('data', (data) => {
                this.logger.log('stdout data: ' + data);
            });
            this.childProcess.stderr.on('data', (data) => {
                this.logger.log('stderr data: ' + data);
            });
            this.childProcess.on('exit', (code) => {
                resolve(true);
                this.logger.log('exit');
                this.childProcess.kill();
                this.childProcess = null;
                if (code !== 0) {
                    this.logger.log('grep process exited with code ' + code);
                }
            });
        });
        return {
            process: this.childProcess,
            promise,
        };
    }
    createStreamFromFile(filePath) {
        return (0, fs_1.createReadStream)(filePath);
    }
    async stopStreamAudio() {
        this.childProcess.kill();
    }
    async openServerUIStream() {
        try {
            const serverStreamUrl = `${process.env.STREAM_SERVER_URL}/stream`;
            if (!this.browser) {
                this.browser = await (0, puppeteer_1.launchBrowser)();
            }
            const urls = await (0, puppeteer_1.getBrowserUrls)(this.browser);
            if (urls.includes(serverStreamUrl)) {
                console.log('Server stream browser already open');
                this.streamingGateway.reconnectPeer();
                return;
            }
            const page = this.page || (await (0, puppeteer_1.openNewpage)(this.browser));
            const access_token = await this.userService.getMasterUserAccessToken();
            await page.setCookie({
                name: 'accessToken',
                url: process.env.STREAM_SERVER_URL,
                value: access_token,
            });
            await page.goto(serverStreamUrl);
            await page.focus('body');
        }
        catch (error) {
            console.log(error, 'Error when open page');
        }
    }
    async closeServerUIStream() {
        try {
            if (this.page) {
                await this.page.close();
                this.page = null;
            }
        }
        catch (error) {
            console.log(error, 'Error when close page');
        }
    }
};
__decorate([
    (0, common_1.Inject)(streaming_gateway_1.StreamingGateway),
    __metadata("design:type", streaming_gateway_1.StreamingGateway)
], StreamingService.prototype, "streamingGateway", void 0);
StreamingService = StreamingService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService])
], StreamingService);
exports.StreamingService = StreamingService;
//# sourceMappingURL=streaming.service.js.map