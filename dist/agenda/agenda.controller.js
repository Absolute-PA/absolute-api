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
exports.AgendaController = void 0;
const common_1 = require("@nestjs/common");
const agenda_service_1 = require("./agenda.service");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const role_enum_1 = require("../auth/enums/role.enum");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
let AgendaController = class AgendaController {
    constructor(agendaService) {
        this.agendaService = agendaService;
    }
    async getJobs() {
        return this.agendaService.getJobs();
    }
    async scheduleJob(jobDTO) {
        return this.agendaService.scheduleJob(jobDTO);
    }
    async rescheduleJob(id, jobDTO) {
        return this.agendaService.rescheduleJob(id, jobDTO);
    }
    async cancelJob(id) {
        return this.agendaService.cancelJob(id);
    }
};
__decorate([
    (0, common_1.Get)('/jobs'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.User, role_enum_1.Role.Viewer),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AgendaController.prototype, "getJobs", null);
__decorate([
    (0, common_1.Post)('/jobs'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.User, role_enum_1.Role.Viewer),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AgendaController.prototype, "scheduleJob", null);
__decorate([
    (0, common_1.Post)('/jobs/:id'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.User, role_enum_1.Role.Viewer),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AgendaController.prototype, "rescheduleJob", null);
__decorate([
    (0, common_1.Delete)('/jobs/:id'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin, role_enum_1.Role.User, role_enum_1.Role.Viewer),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AgendaController.prototype, "cancelJob", null);
AgendaController = __decorate([
    (0, common_1.Controller)('agenda'),
    __metadata("design:paramtypes", [agenda_service_1.AgendaService])
], AgendaController);
exports.AgendaController = AgendaController;
//# sourceMappingURL=agenda.controller.js.map