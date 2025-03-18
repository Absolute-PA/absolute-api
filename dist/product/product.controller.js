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
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const product_service_1 = require("./product.service");
const create_product_dto_1 = require("./dtos/create-product.dto");
const filter_product_dto_1 = require("./dtos/filter-product.dto");
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    async getProducts(filterProductDTO) {
        if (Object.keys(filterProductDTO).length) {
            const filteredProducts = await this.productService.getFilteredProducts(filterProductDTO);
            return filteredProducts;
        }
        else {
            const allProducts = await this.productService.getAllProducts();
            return allProducts;
        }
    }
    async getProduct(id) {
        const product = await this.productService.getProduct(id);
        if (!product)
            throw new common_1.NotFoundException('Product does not exist!');
        return product;
    }
    async addProduct(createProductDTO) {
        const product = await this.productService.addProduct(createProductDTO);
        return product;
    }
    async updateProduct(id, createProductDTO) {
        const product = await this.productService.updateProduct(id, createProductDTO);
        if (!product)
            throw new common_1.NotFoundException('Product does not exist!');
        return product;
    }
    async deleteProduct(id) {
        const product = await this.productService.deleteProduct(id);
        if (!product)
            throw new common_1.NotFoundException('Product does not exist');
        return product;
    }
};
__decorate([
    (0, common_1.Get)('/'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_product_dto_1.FilterProductDTO]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProducts", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProduct", null);
__decorate([
    (0, common_1.Post)('/'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto_1.CreateProductDTO]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "addProduct", null);
__decorate([
    (0, common_1.Put)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_product_dto_1.CreateProductDTO]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "updateProduct", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "deleteProduct", null);
ProductController = __decorate([
    (0, common_1.Controller)('store/products'),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductController);
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map