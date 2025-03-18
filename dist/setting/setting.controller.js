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
exports.SettingController = void 0;
const common_1 = require("@nestjs/common");
const setting_service_1 = require("./setting.service");
const dto_1 = require("./dto");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const role_enum_1 = require("../auth/enums/role.enum");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const setting_mapper_1 = require("./mappers/setting.mapper");
const child_process_1 = require("child_process");
const user_setting_dto_1 = require("./dto/user-setting.dto");
let SettingController = class SettingController {
    constructor(settingService) {
        this.settingService = settingService;
        this.initalize();
    }
    async findFirst() {
        const setting = await this.settingService.findFirst();
        const result = this.settingService.validateLicenseKey(setting.licenseKey, setting.schoolId);
        return (0, setting_mapper_1.mapSettingDocumentToDto)(setting, result.expiryDate);
    }
    async updateCode() {
        const process = (0, child_process_1.exec)('pm2 restart startUI startApi');
        console.log('Success request update app to latest version');
        process.stdout.on('error', (err) => {
            console.log(err);
        });
        process.stdin.on('error', (error) => {
            console.log(error);
        });
        process.stderr.on('data', (data) => {
            console.log(data);
        });
        return 'Success request update app to latest version';
    }
    async update(id, updateSettingDto) {
        const result = this.settingService.validateLicenseKey(updateSettingDto.licenseKey, updateSettingDto.schoolId);
        if (!result.isValid) {
            throw new common_1.BadRequestException('Invalid license key');
        }
        updateSettingDto.isExpired = false;
        const updatedSetting = await this.settingService.update(id, updateSettingDto);
        return (0, setting_mapper_1.mapSettingDocumentToDto)(updatedSetting, result.expiryDate);
    }
    async updateUserSetting(id, userSetting) {
        userSetting.maxUser = +userSetting.maxUser;
        if (isNaN(userSetting.maxUser)) {
            throw new common_1.BadRequestException('Max user must be a number');
        }
        const updatedSetting = await this.settingService.updateUserSetting(userSetting);
        return updatedSetting.userSetting;
    }
    async killJobs() {
        await this.settingService.killJobs();
    }
    async initalize() {
        const setting = await this.settingService.findFirst();
        if (!setting) {
            await this.settingService.create({
                schoolId: '',
                licenseKey: '',
                isExpired: true,
            });
        }
    }
};
__decorate([
    (0, common_1.Get)('/'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.User, role_enum_1.Role.Viewer),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SettingController.prototype, "findFirst", null);
__decorate([
    (0, common_1.Post)('/update'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.User),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SettingController.prototype, "updateCode", null);
__decorate([
    (0, common_1.Patch)(':id/license'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.User),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateSettingDto]),
    __metadata("design:returntype", Promise)
], SettingController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/user-setting'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Master),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_setting_dto_1.UserSettingDto]),
    __metadata("design:returntype", Promise)
], SettingController.prototype, "updateUserSetting", null);
__decorate([
    (0, common_1.Post)('/kill-jobs'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.User),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SettingController.prototype, "killJobs", null);
SettingController = __decorate([
    (0, common_1.Controller)('setting'),
    __metadata("design:paramtypes", [setting_service_1.SettingService])
], SettingController);
exports.SettingController = SettingController;
//# sourceMappingURL=setting.controller.js.map