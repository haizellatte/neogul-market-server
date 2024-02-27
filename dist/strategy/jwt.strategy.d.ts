import { AuthService } from "src/domains/auth/auth.service";
interface TokenPayload {
    id: string;
    email: string;
}
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly authService;
    constructor(authService: AuthService);
    validate(payload: TokenPayload): Promise<{
        id: string;
        email: string;
        encryptedPassword: string;
        createdAt: Date;
    }>;
}
export {};
