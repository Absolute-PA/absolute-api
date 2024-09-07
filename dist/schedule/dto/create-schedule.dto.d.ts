import { WeekDay } from '../schemas/schedule.schema';
export declare class CreateScheduleDto {
    name: string;
    color: string;
    startDate: Date;
    endDate: Date;
    excludeDates: Date[];
    includeDates: Date[];
    weekDays: WeekDay[];
    priority: number;
}
