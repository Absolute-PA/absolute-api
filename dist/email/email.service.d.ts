import { SettingService } from '../setting/setting.service';
export interface ExceptionEmailDetails {
    message: string;
    url?: string;
    method?: string;
    body?: any;
    headers?: any;
    timestamp?: string;
    piName?: string;
}
export declare class EmailService {
    private readonly _settingService;
    private readonly logger;
    private transporter;
    constructor(_settingService: SettingService);
    private createTransporter;
    private isEmailConfigured;
    sendExceptionNotification(details: ExceptionEmailDetails): Promise<void>;
    private formatExceptionEmail;
    private formatExceptionEmailHtml;
    private getDeviceName;
}
