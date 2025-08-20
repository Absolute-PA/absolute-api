import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { EmailService } from '../../email/email.service';
export declare class AppExceptionFilter implements ExceptionFilter {
    private readonly emailService;
    private readonly logger;
    constructor(emailService: EmailService);
    catch(exception: Error, host: ArgumentsHost): Promise<void>;
    private sanitizeHeaders;
}
