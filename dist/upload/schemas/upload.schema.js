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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadSchema = exports.Upload = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let Upload = class Upload {
};
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now, type: Date }),
    __metadata("design:type", String)
], Upload.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Upload.prototype, "fileName", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Upload.prototype, "filePath", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Upload.prototype, "mineType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 50 }),
    __metadata("design:type", Number)
], Upload.prototype, "volume", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Upload.prototype, "fileType", void 0);
Upload = __decorate([
    (0, mongoose_1.Schema)()
], Upload);
exports.Upload = Upload;
exports.UploadSchema = mongoose_1.SchemaFactory.createForClass(Upload);
//# sourceMappingURL=upload.schema.js.map