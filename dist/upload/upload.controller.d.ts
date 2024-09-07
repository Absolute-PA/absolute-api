/// <reference types="multer" />
import { UploadService } from './upload.service';
import { UpdateUploadDto } from './dto/update-upload.dto';
export declare class UploadController {
    private readonly uploadService;
    constructor(uploadService: UploadService);
    uploadFile(file: Express.Multer.File): Promise<void>;
    uploadTemp(file: Express.Multer.File): Express.Multer.File;
    update(id: string, updateUploadDto: UpdateUploadDto): string;
    remove(id: string): string;
}
