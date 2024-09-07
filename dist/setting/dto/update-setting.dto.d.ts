import { CreateSettingDto } from './create-setting.dto';
import { UserSettingDto } from './user-setting.dto';
declare const UpdateSettingDto_base: import("@nestjs/common").Type<Partial<CreateSettingDto>>;
export declare class UpdateSettingDto extends UpdateSettingDto_base {
    userSetting?: UserSettingDto;
}
export {};
