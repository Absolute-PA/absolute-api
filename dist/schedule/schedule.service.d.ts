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
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { ScheduleDocument } from './schemas/schedule.schema';
export declare class ScheduleService {
    private readonly scheduleModel;
    constructor(scheduleModel: Model<ScheduleDocument>);
    create(createScheduleDto: CreateScheduleDto): Promise<ScheduleDocument>;
    findAll(): Promise<ScheduleDocument[]>;
    findOne(id: string): Promise<ScheduleDocument>;
    findEligibleSchedule(date: Date): Promise<ScheduleDocument | null>;
    findAllActiveSchedules(date: Date): Promise<ScheduleDocument[]>;
    findEligibleScheduleBetween(startDate: Date, endDate: Date): Promise<Record<string, ScheduleDocument>>;
    update(id: string, updateScheduleDto: UpdateScheduleDto): Promise<ScheduleDocument>;
    remove(id: string): Promise<import("./schemas/schedule.schema").Schedule & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    addIncludeDate(scheduleId: string, dateToInclude: Date): Promise<ScheduleDocument>;
    private removeOtherExistingIncludeDates;
    clone(id: string): Promise<ScheduleDocument>;
}
