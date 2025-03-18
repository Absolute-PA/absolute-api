"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapSettingDocumentToDto = void 0;
const mapSettingDocumentToDto = (settingDocument, expiryDate) => {
    return {
        _id: settingDocument._id,
        schoolId: settingDocument.schoolId,
        licenseKey: settingDocument.licenseKey,
        isExpired: settingDocument.isExpired,
        userSetting: settingDocument.userSetting,
        createdAtUtc: settingDocument.createdAtUtc.toISOString(),
        updatedAtUtc: settingDocument.updatedAtUtc.toISOString(),
        expiryDate,
        appVersion: process.env.npm_package_version,
    };
};
exports.mapSettingDocumentToDto = mapSettingDocumentToDto;
//# sourceMappingURL=setting.mapper.js.map