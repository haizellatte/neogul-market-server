import { User } from "@prisma/client";
import { PrismaService } from "src/database/prisma/prisma.service";
import { UsersAuthDto } from "./auth.dto";
export declare class AuthService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    generateAccessToken(user: Pick<User, "id" | "email">): Promise<string>;
    refreshToken(user: User): Promise<string>;
    getUserByEmail(email: string): Promise<{
        id: string;
        email: string;
        encryptedPassword: string;
        createdAt: Date;
    }>;
    SignUp(signUpDto: UsersAuthDto): Promise<{
        accessToken: string;
    }>;
    LogIn(logInDto: UsersAuthDto): Promise<{
        accessToken: string;
    }>;
}
