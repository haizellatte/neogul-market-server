/// <reference types="cookie-parser" />
import { NestMiddleware } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { PrismaService } from "src/database/prisma/prisma.service";
export declare class AuthMiddleware implements NestMiddleware<Request, Response> {
    private readonly prismaService;
    private readonly configService;
    constructor(prismaService: PrismaService, configService: ConfigService);
    use(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: (error?: any) => void): Promise<void>;
}
