import { CanActivate, ExecutionContext } from '@nestjs/common';
import { SettingService } from '@root/src/setting/setting.service';
export declare class LicenseGuard implements CanActivate {
    private settingService;
    constructor(settingService: SettingService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
