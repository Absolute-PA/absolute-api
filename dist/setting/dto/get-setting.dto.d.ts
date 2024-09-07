import { UserSettingDto } from './user-setting.dto';
export interface SettingDto {
    _id: string;
    schoolId: string;
    licenseKey: string;
    isExpired: boolean;
    userSetting: UserSettingDto;
    createdAtUtc: string;
    updatedAtUtc: string;
    expiryDate: string;
    appVersion: string;
}
