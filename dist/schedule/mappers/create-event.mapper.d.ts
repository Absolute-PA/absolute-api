import { EventSnapshot } from '../schemas';
import { CreateEventDto } from '../dto';
export declare const mapCreateDtoToEventDocument: (createEventDto: CreateEventDto) => EventSnapshot;
