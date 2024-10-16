import { Model } from 'mongoose';
import { SettingDocument } from './schemas';
import { CreateSettingDto, UpdateSettingDto } from './dto';
import { UserSettingDto } from './dto/user-setting.dto';
interface ValidationResult {
    isValid: boolean;
    expiryDate: string;
}
export declare class SettingService {
    private readonly settingModel;
    constructor(settingModel: Model<SettingDocument>);
    create(setting: CreateSettingDto): Promise<SettingDocument>;
    findFirst(): Promise<SettingDocument | null>;
    update(id: string, updateSettingDto: UpdateSettingDto): Promise<SettingDocument>;
    updateExpiryStatus(): Promise<SettingDocument>;
    updateUserSetting(userSetting: UserSettingDto): Promise<SettingDocument>;
    validateLicenseKey(licenseKey: string, schoolId: string): ValidationResult;
    killJobs(): Promise<void>;
}
export {};
