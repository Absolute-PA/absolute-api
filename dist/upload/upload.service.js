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
var UploadService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const path_1 = require("path");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let UploadService = UploadService_1 = class UploadService {
    constructor(uploadModel) {
        this.uploadModel = uploadModel;
        this.logger = new common_1.Logger(UploadService_1.name);
    }
    create(createUploadDto) {
        return 'This action adds a new upload';
    }
    saveFile(file, directory, filename) {
        try {
            const path = `/assets/${directory}/${filename}`;
            const absolutePath = (0, path_1.join)(process.cwd(), path);
            fs.writeFileSync(absolutePath, file.buffer);
            return path;
        }
        catch (error) {
            this.logger.log(error);
        }
    }
    async saveRecordedVoice({ fileName, filePath, mineType, }) {
        await this.uploadModel.create({
            fileName,
            filePath,
            mineType,
            fileType: 'voice-recorded',
        });
    }
    async getAllVoicesRecorded() {
        const files = await this.uploadModel
            .find({ fileType: 'voice-recorded' })
            .sort({ createdAt: -1 });
        return files;
    }
    async deleteVoiceRecord(id) {
        const files = await this.uploadModel.findOneAndDelete({ _id: id });
        return files;
    }
    async updateVoiceRecord(voiceData) {
        return await this.uploadModel.findByIdAndUpdate(voiceData.id, Object.assign({}, voiceData), { new: true });
    }
    findAll() {
        return `This action returns all upload`;
    }
    async findVoiceRecoredById(id) {
        return await this.uploadModel.findOne({
            fileType: 'voice-recorded',
            _id: id,
        });
    }
    update(id, updateUploadDto) {
        return `This action updates a #${id} upload`;
    }
    remove(id) {
        return `This action removes a #${id} upload`;
    }
};
UploadService = UploadService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Upload')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UploadService);
exports.UploadService = UploadService;
//# sourceMappingURL=upload.service.js.map