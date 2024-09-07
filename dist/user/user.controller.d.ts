import { UserService } from './user.service';
import { UpdateUserDTO } from './dtos/update-user.dto';
export declare class UserController {
    private userService;
    private readonly logger;
    constructor(userService: UserService);
    getAllUsers(): Promise<Pick<import("./schemas/user.schema").User, "username" | "email" | "roles">[]>;
    update(id: string, updateUserDto: UpdateUserDTO): Promise<import("./schemas/user.schema").User>;
    resetPassword(id: string): Promise<Omit<import("./schemas/user.schema").User, "password">>;
    delete(id: string): Promise<import("./schemas/user.schema").User>;
}
