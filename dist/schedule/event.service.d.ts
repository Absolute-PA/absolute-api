import { Model } from 'mongoose';
import { ScheduleDocument, EventSnapshot } from './schemas/schedule.schema';
export declare class EventService {
    private readonly scheduleModel;
    constructor(scheduleModel: Model<ScheduleDocument>);
    addEvent(id: string, event: EventSnapshot): Promise<ScheduleDocument>;
    removeEvent(id: string, eventId: string): Promise<ScheduleDocument>;
    updateEvent(id: string, event: EventSnapshot): Promise<ScheduleDocument>;
}
