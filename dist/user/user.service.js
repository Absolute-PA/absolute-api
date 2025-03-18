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
var UserService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = exports.MasterUserUsername = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const role_enum_1 = require("../auth/enums/role.enum");
const jwt_1 = require("@nestjs/jwt");
const verify_1 = require("../auth/verify");
const setting_service_1 = require("../setting/setting.service");
const constants_1 = require("../setting/constants");
exports.MasterUserUsername = 'absolutePA123';
let UserService = UserService_1 = class UserService {
    constructor(userModel, jwtService, settingService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
        this.settingService = settingService;
        this.logger = new common_1.Logger(UserService_1.name);
    }
    async addUser(createUserDTO) {
        var _a;
        const duplicateUser = await this.userModel.findOne({
            email: createUserDTO.email,
        });
        if (duplicateUser)
            throw new Error('Email is exist');
        const totalUser = (await this.userModel.find({})).length;
        const maxUser = ((_a = (await this.settingService.findFirst()).userSetting) === null || _a === void 0 ? void 0 : _a.maxUser) ||
            constants_1.DEFAULT_MAX_USER;
        if (totalUser > maxUser)
            throw new Error(`Your account reach maximum number of account: ${maxUser}`);
        const newUser = await this.userModel.create(createUserDTO);
        newUser.password = await (0, verify_1.hash)(newUser.password);
        return newUser.save();
    }
    async findUser(username) {
        const user = await this.userModel.findOne({ username: username });
        return user;
    }
    async getAllUser() {
        const users = await this.userModel
            .find({ roles: { $ne: role_enum_1.Role.Master } })
            .select('-password');
        return users.map((user) => ({
            email: user.email,
            roles: user.roles,
            username: user.username,
            id: user.id,
        }));
    }
    async updateUser(id, userPayload) {
        try {
            return await this.userModel
                .findByIdAndUpdate(id, userPayload)
                .select('-password');
        }
        catch (error) {
            this.logger.error(error);
            return;
        }
    }
    async deleteUser(id) {
        const user = await this.userModel.findById(id).select('-password');
        if (!user)
            return;
        return await user.deleteOne();
    }
    async resetPassword(id) {
        try {
            const user = await this.userModel.findById(id).select('-password');
            if (!user)
                return;
            user.password = await (0, verify_1.hash)(process.env.DEFAULT_PASSWORD);
            return user.save();
        }
        catch (error) {
            this.logger.error(error);
        }
    }
    async onModuleInit() {
        try {
            const masterUser = await this.userModel.findOne({
                username: exports.MasterUserUsername,
            });
            if (masterUser) {
                await masterUser.delete();
            }
            await this.addUser({
                username: exports.MasterUserUsername,
                email: 'absolutePA123@gmail.com',
                roles: [role_enum_1.Role.Master],
                password: process.env.MASTER_PASSWORD,
            });
        }
        catch (error) {
            this.logger.error(error);
        }
    }
    async getMasterUserAccessToken() {
        const masterUser = await this.userModel.findOne({
            username: exports.MasterUserUsername,
        });
        const accessToken = await this.jwtService.sign(masterUser.toObject(), {
            secret: process.env.JWT_SECRET,
        });
        return accessToken;
    }
};
UserService = UserService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_1.Model,
        jwt_1.JwtService,
        setting_service_1.SettingService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map