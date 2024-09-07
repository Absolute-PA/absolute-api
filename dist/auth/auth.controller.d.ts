import { CreateUserDTO } from 'src/user/dtos/create-user.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    private userService;
    private readonly logger;
    constructor(authService: AuthService, userService: UserService);
    register(createUserDTO: CreateUserDTO): Promise<import("../user/schemas/user.schema").User>;
    login(req: any): Promise<{
        access_token: string;
    }>;
    updatePassword(req: any): Promise<import("../user/schemas/user.schema").User>;
    getProfile(req: any): any;
    getDashboard(req: any): any;
}
