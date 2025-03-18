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
var TextToAudioService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextToAudioService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const gTTS = require("gtts");
const mongoose_2 = require("mongoose");
const crypto = require("crypto");
let TextToAudioService = TextToAudioService_1 = class TextToAudioService {
    constructor(messageModel) {
        this.messageModel = messageModel;
        this.logger = new common_1.Logger(TextToAudioService_1.name);
    }
    async textToAudio(text, cb) {
        const audioStream = new gTTS(text, 'en').stream();
        cb(audioStream);
    }
    async saveMessage(message) {
        const hash = crypto.createHash('sha256').update(message).digest('base64');
        const savedMessage = await this.messageModel.findOne({ hash });
        if (savedMessage) {
            this.logger.log('Found the same message in the DB');
            return savedMessage;
        }
        return this.messageModel.create({ message, hash });
    }
    async getMessages() {
        return this.messageModel.find({}).sort({ createdAt: -1 });
    }
    async getMessageById(id) {
        return this.messageModel.findOne({ _id: id });
    }
    async deleteTextMessage(id) {
        return this.messageModel.findByIdAndDelete({ _id: id });
    }
    async updateTextMessage(id, message) {
        return this.messageModel.findByIdAndUpdate({ _id: id }, message, {
            new: true,
        });
    }
};
TextToAudioService = TextToAudioService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Message')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], TextToAudioService);
exports.TextToAudioService = TextToAudioService;
//# sourceMappingURL=text-to-audio.service.js.map