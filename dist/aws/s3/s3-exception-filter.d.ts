import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { S3Service } from './s3.service';
export declare class S3ExceptionFilter implements ExceptionFilter {
    private readonly s3Service;
    constructor(s3Service: S3Service);
    catch(exception: Error, host: ArgumentsHost): Promise<void>;
}
