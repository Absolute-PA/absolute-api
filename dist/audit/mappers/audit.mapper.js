"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapToAuditDto = void 0;
const mapToAuditDto = (document) => ({
    _id: document._id,
    actor: document.actor,
    name: document.name,
    message: document.message,
    createdAtUtc: document.createdAtUtc.toISOString(),
});
exports.mapToAuditDto = mapToAuditDto;
//# sourceMappingURL=audit.mapper.js.map