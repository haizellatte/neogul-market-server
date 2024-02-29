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
exports.AuthMiddleware = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jsonwebtoken_1 = require("jsonwebtoken");
const prisma_service_1 = require("../database/prisma/prisma.service");
let AuthMiddleware = class AuthMiddleware {
    constructor(prismaService, configService) {
        this.prismaService = prismaService;
        this.configService = configService;
    }
    async use(req, res, next) {
        req.user = null;
        const accessToken = req.headers.authorization?.split("Bearer ")[1];
        if (!accessToken)
            return next();
        let id;
        try {
            const secret = this.configService.getOrThrow("JWT_SECRET_KEY");
            const { sub } = (0, jsonwebtoken_1.verify)(accessToken, secret);
            id = sub;
        }
        catch (e) {
            console.log(1111);
            throw new common_1.UnauthorizedException("Invalid accessToken");
        }
        const user = await this.prismaService.user.findUnique({
            where: { id },
        });
        if (!user)
            throw new common_1.BadRequestException("Delete user");
        req.user = user;
        next();
    }
};
exports.AuthMiddleware = AuthMiddleware;
exports.AuthMiddleware = AuthMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService])
], AuthMiddleware);
//# sourceMappingURL=auth.middlewares.js.map