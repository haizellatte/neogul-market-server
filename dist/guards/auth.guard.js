"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const jsonwebtoken_1 = require("jsonwebtoken");
const prisma_service_1 = require("../database/prisma/prisma.service");
let AuthGuard = class AuthGuard {
    constructor(reflector, configService, prismaService) {
        this.reflector = reflector;
        this.configService = configService;
        this.prismaService = prismaService;
    }
    async canActivate(context) {
        const userTypeInDecorator = this.reflector.getAllAndOverride("user", [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!userTypeInDecorator) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const accessToken = this.extractTokenFromHeader(request);
        if (!accessToken) {
            throw new common_1.UnauthorizedException();
        }
        try {
            const secret = this.configService.getOrThrow("JWT_SECRET_KEY");
            const { sub: id } = (0, jsonwebtoken_1.verify)(accessToken, secret);
            const user = await this.prismaService.user.findUniqueOrThrow({
                where: { id },
            });
            request.user = user;
        }
        catch (e) {
            throw new common_1.UnauthorizedException();
        }
        return true;
    }
    extractTokenFromHeader(request) {
        const [type, token] = request.headers.authorization?.split(" ") ?? [];
        return type === "Bearer" ? token : undefined;
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        config_1.ConfigService,
        prisma_service_1.PrismaService])
], AuthGuard);
//# sourceMappingURL=auth.guard.js.map