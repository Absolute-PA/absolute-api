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
import { Model } from 'mongoose';
import { MessageDocument } from './schemas/message.schema';
import { TextDTO } from './dtos/text.dto';
export declare class TextToAudioService {
    private readonly messageModel;
    private readonly logger;
    constructor(messageModel: Model<MessageDocument>);
    textToAudio(text: string, cb: any): Promise<void>;
    saveMessage(message: string): Promise<import("mongoose").Document<unknown, any, import("./schemas/message.schema").Message> & Omit<import("./schemas/message.schema").Message & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    getMessages(): Promise<(import("mongoose").Document<unknown, any, import("./schemas/message.schema").Message> & Omit<import("./schemas/message.schema").Message & {
        _id: import("mongoose").Types.ObjectId;
    }, never>)[]>;
    getMessageById(id: string): Promise<import("mongoose").Document<unknown, any, import("./schemas/message.schema").Message> & Omit<import("./schemas/message.schema").Message & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    deleteTextMessage(id: string): Promise<import("mongoose").Document<unknown, any, import("./schemas/message.schema").Message> & Omit<import("./schemas/message.schema").Message & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    updateTextMessage(id: string, message: TextDTO): Promise<import("mongoose").Document<unknown, any, import("./schemas/message.schema").Message> & Omit<import("./schemas/message.schema").Message & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
}
