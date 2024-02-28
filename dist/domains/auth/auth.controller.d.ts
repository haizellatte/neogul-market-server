import { User } from "@prisma/client";
import { Response } from "express";
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
    logOut(res: Response): Response<any, Record<string, any>>;
    refreshToken(user: User): Promise<string>;
}
