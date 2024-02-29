import { User } from "@prisma/client";
import { UsersAuthDto } from "./auth.dto";
import { AuthService } from "./auth.service";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signUp(signUpDto: UsersAuthDto): Promise<{
        accessToken: string;
    }>;
    LogIn(LogInDto: UsersAuthDto): Promise<{
        accessToken: string;
    }>;
    logOut(user: User): Promise<{
        id: string;
        email: string;
        encryptedPassword: string;
        createdAt: Date;
    }>;
    refreshToken(user: User): Promise<string>;
    findUser(user: User): Promise<{
        id: string;
        email: string;
        encryptedPassword: string;
        createdAt: Date;
    }>;
}
