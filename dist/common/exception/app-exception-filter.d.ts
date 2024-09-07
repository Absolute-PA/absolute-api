import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
export declare class AppExceptionFilter implements ExceptionFilter {
    private readonly logger;
    catch(exception: Error, host: ArgumentsHost): Promise<void>;
}
