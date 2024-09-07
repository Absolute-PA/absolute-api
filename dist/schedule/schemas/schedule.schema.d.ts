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
import { Document } from 'mongoose';
export type ScheduleDocument = Schedule & Document;
export declare enum WeekDay {
    Sunday = 0,
    Monday = 1,
    Tuesday = 2,
    Wednesday = 3,
    Thursday = 4,
    Friday = 5,
    Saturday = 6
}
export interface EventSnapshot {
    id: string;
    name: string;
    time: string;
    jobType: string;
    data: Record<string, any>;
}
export declare class Schedule {
    name: string;
    color: string;
    startDate: Date | null;
    endDate: Date | null;
    excludeDates: Date[];
    includeDates: Date[];
    weekDays: WeekDay[];
    priority: number;
    events: EventSnapshot[];
    createdAtUtc: Date;
    updatedAtUtc: Date;
}
export declare const ScheduleSchema: import("mongoose").Schema<Schedule, import("mongoose").Model<Schedule, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Schedule>;
