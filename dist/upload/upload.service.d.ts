/// <reference types="multer" />
/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { UploadDocument } from './schemas/upload.schema';
import { Model } from 'mongoose';
export declare class UploadService {
    private readonly uploadModel;
    private readonly logger;
    constructor(uploadModel: Model<UploadDocument>);
    create(createUploadDto: CreateUploadDto): string;
    saveFile(file: Express.Multer.File, directory: string, filename: string): string;
    saveRecordedVoice({ fileName, filePath, mineType, }: {
        filePath: string;
        fileName: string;
        mineType: string;
    }): Promise<void>;
    getAllVoicesRecorded(): Promise<(import("mongoose").Document<unknown, any, import("./schemas/upload.schema").Upload> & Omit<import("./schemas/upload.schema").Upload & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)[]>;
    deleteVoiceRecord(id: string): Promise<import("mongoose").Document<unknown, any, import("./schemas/upload.schema").Upload> & Omit<import("./schemas/upload.schema").Upload & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    updateVoiceRecord(voiceData: UpdateUploadDto): Promise<import("mongoose").Document<unknown, any, import("./schemas/upload.schema").Upload> & Omit<import("./schemas/upload.schema").Upload & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    findAll(): string;
    findVoiceRecoredById(id: string): Promise<import("mongoose").Document<unknown, any, import("./schemas/upload.schema").Upload> & Omit<import("./schemas/upload.schema").Upload & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    update(id: number, updateUploadDto: UpdateUploadDto): string;
    remove(id: number): string;
}
