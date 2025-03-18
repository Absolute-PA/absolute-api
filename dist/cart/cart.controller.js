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
exports.CartController = void 0;
const common_1 = require("@nestjs/common");
const roles_decorator_1 = require("src/auth/decorators/roles.decorator");
const role_enum_1 = require("src/auth/enums/role.enum");
const jwt_guard_1 = require("src/auth/guards/jwt.guard");
const roles_guard_1 = require("src/auth/guards/roles.guard");
const cart_service_1 = require("./cart.service");
const item_dto_1 = require("./dtos/item.dto");
let CartController = class CartController {
    constructor(cartService) {
        this.cartService = cartService;
    }
    async addItemToCart(req, itemDTO) {
        const userId = req.user.userId;
        const cart = await this.cartService.addItemToCart(userId, itemDTO);
        return cart;
    }
    async removeItemFromCart(req, { productId }) {
        const userId = req.user.userId;
        const cart = await this.cartService.removeItemFromCart(userId, productId);
        if (!cart)
            throw new common_1.NotFoundException('Item does not exist');
        return cart;
    }
    async deleteCart(userId) {
        const cart = await this.cartService.deleteCart(userId);
        if (!cart)
            throw new common_1.NotFoundException('Cart does not exist');
        return cart;
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.User),
    (0, common_1.Post)('/'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, item_dto_1.ItemDTO]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "addItemToCart", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.User),
    (0, common_1.Delete)('/'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "removeItemFromCart", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.User),
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "deleteCart", null);
CartController = __decorate([
    (0, common_1.Controller)('cart'),
    __metadata("design:paramtypes", [cart_service_1.CartService])
], CartController);
exports.CartController = CartController;
//# sourceMappingURL=cart.controller.js.map