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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const prisma_service_1 = require("../../database/prisma/prisma.service");
let AuthService = class AuthService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async generateAccessToken(user) {
        const accessToken = (0, jsonwebtoken_1.sign)({ id: user.id, email: user.email }, process.env.JWT_SECRET_KEY, {
            subject: String(user.id),
            expiresIn: "2h",
        });
        return accessToken;
    }
    async getUserByEmail(email) {
        const user = await this.prismaService.user.findUnique({
            where: {
                email,
            },
        });
        if (!user)
            throw new common_1.BadRequestException("Invalid email or password");
        return user;
    }
    async SignUp(signUpDto) {
        const { email, password } = signUpDto;
        const findUser = await this.prismaService.user.findUnique({
            where: {
                email,
            },
        });
        if (findUser)
            throw new common_1.BadRequestException("User is already exists!");
        const encryptedPassword = await (0, bcrypt_1.hash)(password, 15);
        const user = await this.prismaService.user.create({
            data: {
                email,
                encryptedPassword,
            },
        });
        const accessToken = await this.generateAccessToken(user);
        return { accessToken };
    }
    async LogIn(logInDto) {
        const { email, password } = logInDto;
        const user = await this.prismaService.user.findUnique({
            where: {
                email,
            },
        });
        if (!user)
            throw new common_1.BadRequestException("Invalid email or password");
        const encryptedPassword = await (0, bcrypt_1.compare)(password, user.encryptedPassword);
        if (!encryptedPassword)
            throw new common_1.BadRequestException("Invalid email or password");
        const accessToken = await this.generateAccessToken(user);
        return { accessToken };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AuthService);
//# sourceMappingURL=auth.service.js.map