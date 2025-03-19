import { OnModuleInit } from '@nestjs/common';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDTO } from './dtos/create-user.dto';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { JwtService } from '@nestjs/jwt';
import { SettingService } from '../setting/setting.service';
export declare const MasterUserUsername = "absolutePA123";
export declare const DefaultAdminUsername = "admin@absolutepa";
export declare const DefaultAdminPassword = "forgotpassword";
export declare class UserService implements OnModuleInit {
    private readonly userModel;
    private jwtService;
    private readonly settingService;
    private readonly logger;
    constructor(userModel: Model<UserDocument>, jwtService: JwtService, settingService: SettingService);
    addUser(createUserDTO: CreateUserDTO): Promise<User>;
    findUser(username: string): Promise<User | undefined>;
    getAllUser(): Promise<Pick<User, 'email' | 'roles' | 'username'>[]>;
    updateUser(id: string, userPayload: UpdateUserDTO): Promise<User | undefined>;
    deleteUser(id: string): Promise<User | undefined>;
    resetPassword(id: string): Promise<Omit<User, 'password'> | undefined>;
    onModuleInit(): Promise<void>;
    getMasterUserAccessToken(): Promise<string>;
}
