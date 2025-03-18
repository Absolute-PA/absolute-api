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
exports.AuditService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const mappers_1 = require("./mappers");
let AuditService = class AuditService {
    constructor(auditModel) {
        this.auditModel = auditModel;
    }
    async create(audit) {
        const createdAudit = await this.auditModel.create(audit);
        return createdAudit.save();
    }
    async findAuditsPaginated(page = 1, limit = 30) {
        const skips = limit * (page - 1);
        const totalItems = await this.auditModel.countDocuments();
        const totalPages = Math.ceil(totalItems / limit);
        const data = await this.auditModel
            .find()
            .sort({ createdAtUtc: -1 })
            .skip(skips)
            .limit(limit)
            .exec();
        return {
            data: data.map(mappers_1.mapToAuditDto),
            totalItems,
            currentPage: page,
            totalPages,
        };
    }
};
AuditService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Audit')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AuditService);
exports.AuditService = AuditService;
//# sourceMappingURL=audit.service.js.map