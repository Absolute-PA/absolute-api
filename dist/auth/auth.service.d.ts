import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Role } from './enums/role.enum';
import { User } from '../user/schemas/user.schema';
interface UserJWTPayload {
    username: string;
    sub: string;
    roles: Role[];
    email: string;
}
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    validateUser(username: string, password: string): Promise<any>;
    updatePassword(user: UserJWTPayload, { newPassword }: {
        newPassword: string;
    }): Promise<User>;
    login(user: any): Promise<{
        access_token: string;
    }>;
}
export {};
