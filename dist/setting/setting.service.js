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
exports.SettingService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const CryptoJS = require("crypto-js");
const dayjs = require("dayjs");
const crypto_1 = require("@/common/crypto");
const job_1 = require("@/common/job");
const constants_1 = require("./constants");
const SECRET = 'QVBFVFVMT1NCQQ==';
let SettingService = class SettingService {
    constructor(settingModel) {
        this.settingModel = settingModel;
    }
    async create(setting) {
        const newSetting = new this.settingModel(setting);
        return newSetting.save();
    }
    async findFirst() {
        var _a, _b, _c;
        const settings = await this.settingModel.find().exec();
        const setting = (_a = settings[0]) === null || _a === void 0 ? void 0 : _a.toObject();
        if (!setting)
            return;
        return Object.assign(Object.assign({}, setting), { userSetting: Object.assign(Object.assign({}, setting.userSetting), { maxUser: (_c = (_b = setting.userSetting) === null || _b === void 0 ? void 0 : _b.maxUser) !== null && _c !== void 0 ? _c : constants_1.DEFAULT_MAX_USER }) });
    }
    async update(id, updateSettingDto) {
        const updatedSetting = await this.settingModel
            .findByIdAndUpdate(id, Object.assign(Object.assign({}, updateSettingDto), { updatedAtUtc: new Date() }), { new: true })
            .exec();
        return updatedSetting;
    }
    async updateExpiryStatus() {
        const setting = await this.findFirst();
        const result = this.validateLicenseKey(setting.licenseKey, setting.schoolId);
        return this.update(setting._id, { isExpired: !result.isValid });
    }
    async updateUserSetting(userSetting) {
        const setting = await this.findFirst();
        console.log(setting, 'setting');
        return this.update(setting._id, { userSetting });
    }
    validateLicenseKey(licenseKey, schoolId) {
        try {
            if (!licenseKey) {
                return {
                    isValid: false,
                    expiryDate: '',
                };
            }
            const message = (0, crypto_1.decrypt)(licenseKey, CryptoJS.enc.Base64.parse(SECRET).toString(CryptoJS.enc.Utf8));
            if (message.schoolId !== schoolId) {
                return {
                    isValid: false,
                    expiryDate: '',
                };
            }
            const validFrom = dayjs(message.validFrom, 'DD/MM/YYYY').toDate();
            const validTo = dayjs(message.validTo, 'DD/MM/YYYY').toDate();
            const today = dayjs().toDate();
            if (today < validFrom || today > validTo) {
                return {
                    isValid: false,
                    expiryDate: message.validTo,
                };
            }
            return {
                isValid: true,
                expiryDate: message.validTo,
            };
        }
        catch (e) {
            return {
                isValid: false,
                expiryDate: '',
            };
        }
    }
    async killJobs() {
        job_1.PROCESS_CACHE.killAll();
    }
};
SettingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Setting')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], SettingService);
exports.SettingService = SettingService;
//# sourceMappingURL=setting.service.js.map