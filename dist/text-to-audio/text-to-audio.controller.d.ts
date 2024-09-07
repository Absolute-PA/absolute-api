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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import type { Response } from 'express';
import { TextToAudioService } from './text-to-audio.service';
import { TextDTO } from './dtos/text.dto';
import { StreamingService } from '@root/src/streaming/streaming.service';
export declare class TextToAudioController {
    private textToAudioService;
    private streamingService;
    private readonly logger;
    constructor(textToAudioService: TextToAudioService, streamingService: StreamingService);
    playAudioFile(res: Response, text: TextDTO): Promise<string>;
    saveMessage(res: Response, text: TextDTO): Promise<string>;
    getAllMessage(): Promise<"" | (import("mongoose").Document<unknown, any, import("./schemas/message.schema").Message> & Omit<import("./schemas/message.schema").Message & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)[]>;
    deleteTextMessage(id: string): Promise<import("mongoose").Document<unknown, any, import("./schemas/message.schema").Message> & Omit<import("./schemas/message.schema").Message & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    updateTextMessage(id: string, text: TextDTO): Promise<import("mongoose").Document<unknown, any, import("./schemas/message.schema").Message> & Omit<import("./schemas/message.schema").Message & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
}
