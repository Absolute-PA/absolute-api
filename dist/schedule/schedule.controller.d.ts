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
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ScheduleService } from './schedule.service';
import { CreateScheduleDto, UpdateScheduleDto, CreateEventDto, UpdateEventDto } from './dto';
import { EventService } from './event.service';
import { ScheduleDocument } from './schemas';
export declare class ScheduleController {
    private readonly scheduleService;
    private readonly eventService;
    private readonly eventEmitter;
    constructor(scheduleService: ScheduleService, eventService: EventService, eventEmitter: EventEmitter2);
    create(createScheduleDto: CreateScheduleDto): Promise<ScheduleDocument>;
    findEligibleSchedule(date: string): Promise<ScheduleDocument>;
    findAllActiveSchedules(date: string): Promise<ScheduleDocument[]>;
    findAll(): Promise<ScheduleDocument[]>;
    findEligibleScheduleBetween(from: string, to: string): Promise<Record<string, ScheduleDocument>>;
    findOne(id: string): Promise<ScheduleDocument>;
    update(id: string, updateScheduleDto: UpdateScheduleDto): Promise<ScheduleDocument>;
    remove(id: string): Promise<import("./schemas").Schedule & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    addEvent(id: string, createEventDto: CreateEventDto): Promise<ScheduleDocument>;
    removeEvent(id: string, eventId: string): Promise<ScheduleDocument>;
    updateEvent(id: string, updateEventDto: UpdateEventDto): Promise<ScheduleDocument>;
    addIncludeDate(id: string, date: string): Promise<void>;
    cloneSchedule(id: string): Promise<ScheduleDocument>;
}
