import { SettingService } from './setting.service';
import { UpdateSettingDto, SettingDto } from './dto';
import { UserSettingDto } from './dto/user-setting.dto';
export declare class SettingController {
    private readonly settingService;
    constructor(settingService: SettingService);
    findFirst(): Promise<SettingDto>;
    update(id: string, updateSettingDto: UpdateSettingDto): Promise<SettingDto>;
    updateUserSetting(id: string, userSetting: UserSettingDto): Promise<import("./schemas").UserSettingSnapshot>;
    cleanProcesses(): Promise<string>;
    killJobs(): Promise<void>;
    private initalize;
}
