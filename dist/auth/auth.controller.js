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
var AuthController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const create_user_dto_1 = require("src/user/dtos/create-user.dto");
const user_service_1 = require("src/user/user.service");
const auth_service_1 = require("./auth.service");
const local_guard_1 = require("./guards/local.guard");
const jwt_guard_1 = require("./guards/jwt.guard");
const roles_decorator_1 = require("./decorators/roles.decorator");
const role_enum_1 = require("./enums/role.enum");
const roles_guard_1 = require("./guards/roles.guard");
const public_decorator_1 = require("./decorators/public.decorator");
let AuthController = AuthController_1 = class AuthController {
    constructor(authService, userService) {
        this.authService = authService;
        this.userService = userService;
        this.logger = new common_1.Logger(AuthController_1.name);
    }
    async register(createUserDTO) {
        try {
            const user = await this.userService.addUser(createUserDTO);
            return user;
        }
        catch (error) {
            throw new common_1.BadRequestException('Something went wrong', {
                cause: error,
                description: error.message,
            });
        }
    }
    async login(req) {
        try {
            return await this.authService.login(req.user);
        }
        catch (error) {
            this.logger.error(error);
            throw new common_1.BadRequestException('Something went wrong', {
                cause: error,
                description: error.message,
            });
        }
    }
    async updatePassword(req) {
        try {
            const { newPassword } = req.body;
            if (!newPassword)
                throw new common_1.BadRequestException('Something went wrong');
            return await this.authService.updatePassword(req.user, {
                newPassword,
            });
        }
        catch (error) {
            this.logger.error(error);
            throw new common_1.BadRequestException('Something went wrong', {
                cause: error,
                description: error.message,
            });
        }
    }
    getProfile(req) {
        try {
            return req.user;
        }
        catch (error) {
            this.logger.error(error);
            throw new common_1.BadRequestException('Something went wrong', {
                cause: error,
                description: error.message,
            });
        }
    }
    getDashboard(req) {
        try {
            return req.user;
        }
        catch (error) {
            this.logger.error(error);
            throw new common_1.BadRequestException('Something went wrong', {
                cause: error,
                description: error.message,
            });
        }
    }
};
__decorate([
    (0, common_1.Post)('/register'),
    (0, public_decorator_1.Public)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.UseGuards)(local_guard_1.LocalAuthGuard),
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Post)('/update-password'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "updatePassword", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Get)('/user'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getProfile", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin),
    (0, common_1.Get)('/admin'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getDashboard", null);
AuthController = AuthController_1 = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        user_service_1.UserService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map