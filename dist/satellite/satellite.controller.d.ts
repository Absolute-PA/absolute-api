import { SatelliteService } from './satellite.service';
import { SatelliteDocument } from './schemas/satellite.schema';
export declare class SatelliteController {
    private readonly satelliteService;
    constructor(satelliteService: SatelliteService);
    findAll(): Promise<SatelliteDocument[]>;
    delete(id: string): Promise<SatelliteDocument>;
}
