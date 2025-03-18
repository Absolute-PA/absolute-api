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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoundController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const utils_1 = require("@/common/utils");
const constants_1 = require("@/common/constants");
const sound_service_1 = require("./sound.service");
const dto_1 = require("./dto");
const constants_2 = require("./constants");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const role_enum_1 = require("../auth/enums/role.enum");
const guards_1 = require("../auth/guards");
const enums_1 = require("../common/enums");
const fileInterceptorOptions = {
    storage: (0, multer_1.diskStorage)({
        destination: constants_1.TMP_UPLOAD_DIR,
        filename: (req, file, cb) => {
            return cb(null, `${(0, utils_1.uuid)()}${file.originalname}`);
        },
    }),
};
let SoundController = class SoundController {
    constructor(soundService) {
        this.soundService = soundService;
    }
    async create(createSoundDto) {
        return this.soundService.create(createSoundDto);
    }
    async uploadById(file, id) {
        return this.soundService.upload(id, file);
    }
    async uploadByType(file, type) {
        const createSoundDto = {
            name: file === null || file === void 0 ? void 0 : file.originalname,
            type: type,
        };
        const sound = await this.soundService.create(createSoundDto);
        return this.soundService.upload(sound._id, file);
    }
    async findTunes() {
        return this.soundService.findByType(constants_2.SoundType.Tune);
    }
    async findSongs() {
        return this.soundService.findByType(constants_2.SoundType.Song);
    }
    async update(id, updateSoundDto) {
        return this.soundService.update(id, updateSoundDto);
    }
    async updateVolume(id, updateSoundDto) {
        return this.soundService.updateVolume(id, updateSoundDto);
    }
    async delete(id) {
        return this.soundService.delete(id);
    }
    async play(id, repeat) {
        return this.soundService.play(enums_1.AuditActor.User, id, repeat === 'true');
    }
    async stop(id) {
        return this.soundService.stop(id);
    }
    async resetTunes() {
        return this.soundService.resetTunes();
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.User, role_enum_1.Role.Viewer),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateSoundDto]),
    __metadata("design:returntype", Promise)
], SoundController.prototype, "create", null);
__decorate([
    (0, common_1.Post)(':id/upload'),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.User, role_enum_1.Role.Viewer),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', fileInterceptorOptions)),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], SoundController.prototype, "uploadById", null);
__decorate([
    (0, common_1.Post)('/upload/:type'),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.User, role_enum_1.Role.Viewer),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', fileInterceptorOptions)),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Param)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], SoundController.prototype, "uploadByType", null);
__decorate([
    (0, common_1.Get)('/tunes'),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.User, role_enum_1.Role.Viewer),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SoundController.prototype, "findTunes", null);
__decorate([
    (0, common_1.Get)('/songs'),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.User, role_enum_1.Role.Viewer),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SoundController.prototype, "findSongs", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.User, role_enum_1.Role.Viewer),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateSoundDto]),
    __metadata("design:returntype", Promise)
], SoundController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/volume'),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.User, role_enum_1.Role.Viewer),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateSoundDto]),
    __metadata("design:returntype", Promise)
], SoundController.prototype, "updateVolume", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.User, role_enum_1.Role.Viewer),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SoundController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)(':id/play'),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.RolesGuard, guards_1.LicenseGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.User, role_enum_1.Role.Viewer),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('repeat')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], SoundController.prototype, "play", null);
__decorate([
    (0, common_1.Post)(':id/stop'),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.User, role_enum_1.Role.Viewer),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SoundController.prototype, "stop", null);
__decorate([
    (0, common_1.Post)('/resetTunes'),
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Master),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SoundController.prototype, "resetTunes", null);
SoundController = __decorate([
    (0, common_1.Controller)('sound'),
    __metadata("design:paramtypes", [sound_service_1.SoundService])
], SoundController);
exports.SoundController = SoundController;
//# sourceMappingURL=sound.controller.js.map