import { CanActivate, ExecutionContext } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Reflector } from "@nestjs/core";
import { PrismaService } from "src/database/prisma/prisma.service";
export declare class AuthGuard implements CanActivate {
    private readonly reflector;
    private readonly configService;
    private readonly prismaService;
    constructor(reflector: Reflector, configService: ConfigService, prismaService: PrismaService);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extractTokenFromHeader;
}
