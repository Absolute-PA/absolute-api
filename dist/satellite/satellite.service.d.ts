import { Model } from 'mongoose';
import { SatelliteDocument } from './schemas/satellite.schema';
export declare class SatelliteService {
    private readonly satelliteModel;
    private readonly logger;
    constructor(satelliteModel: Model<SatelliteDocument>);
    registerOrUpdateSatellite(data: {
        deviceId: string;
        name: string;
        ipAddress?: string;
    }): Promise<SatelliteDocument>;
    markOffline(deviceId: string): Promise<void>;
    findAll(): Promise<SatelliteDocument[]>;
    deleteOfflineSatellite(id: string): Promise<SatelliteDocument | null>;
}
