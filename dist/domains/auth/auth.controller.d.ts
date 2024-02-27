import { Request, Response } from "express";
import { UsersAuthDto } from "./auth.dto";
import { AuthService } from "./auth.service";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signUp(signUpDto: UsersAuthDto, req: Request, res: Response): Promise<{
        accessToken: string;
    }>;
    LogIn(LogInDto: UsersAuthDto, res: Response): Promise<{
        accessToken: string;
    }>;
    getCookies(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    logOut(req: Request, res: Response): Response<any, Record<string, any>>;
}
