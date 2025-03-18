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
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
let CartService = class CartService {
    constructor(cartModel) {
        this.cartModel = cartModel;
    }
    async createCart(userId, itemDTO, subTotalPrice, totalPrice) {
        const newCart = await this.cartModel.create({
            userId,
            items: [Object.assign(Object.assign({}, itemDTO), { subTotalPrice })],
            totalPrice,
        });
        return newCart;
    }
    async getCart(userId) {
        const cart = await this.cartModel.findOne({ userId });
        return cart;
    }
    async deleteCart(userId) {
        const deletedCart = await this.cartModel.findOneAndRemove({ userId });
        return deletedCart;
    }
    recalculateCart(cart) {
        cart.totalPrice = 0;
        cart.items.forEach((item) => {
            cart.totalPrice += item.quantity * item.price;
        });
    }
    async addItemToCart(userId, itemDTO) {
        const { productId, quantity, price } = itemDTO;
        const subTotalPrice = quantity * price;
        const cart = await this.getCart(userId);
        if (cart) {
            const itemIndex = cart.items.findIndex((item) => item.productId == productId);
            if (itemIndex > -1) {
                const item = cart.items[itemIndex];
                item.quantity = Number(item.quantity) + Number(quantity);
                item.subTotalPrice = item.quantity * item.price;
                cart.items[itemIndex] = item;
                this.recalculateCart(cart);
                return cart.save();
            }
            else {
                cart.items.push(Object.assign(Object.assign({}, itemDTO), { subTotalPrice }));
                this.recalculateCart(cart);
                return cart.save();
            }
        }
        else {
            const newCart = await this.createCart(userId, itemDTO, subTotalPrice, price);
            return newCart;
        }
    }
    async removeItemFromCart(userId, productId) {
        const cart = await this.getCart(userId);
        const itemIndex = cart.items.findIndex((item) => item.productId == productId);
        if (itemIndex > -1) {
            cart.items.splice(itemIndex, 1);
            return cart.save();
        }
    }
};
CartService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)('Cart')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], CartService);
exports.CartService = CartService;
//# sourceMappingURL=cart.service.js.map