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
exports.MyService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../database/prisma/prisma.service");
let MyService = class MyService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async getWrittenDeals(user) {
        const writtenDeals = await this.prismaService.user.findMany({
            where: {
                email: user.email,
            },
            include: {
                deals: true,
            },
        });
        if (!writtenDeals)
            throw new common_1.HttpException("작성한 게시물이 존재하지 않습니다", common_1.HttpStatus.NOT_FOUND);
        return writtenDeals;
    }
    async userLikesDeals(user) {
        const likesDeals = await this.prismaService.user.findMany({
            where: {
                email: user.email,
            },
            include: {
                likes: true,
            },
        });
        if (!likesDeals)
            throw new common_1.HttpException("찜한 게시물이 없습니다.", common_1.HttpStatus.NOT_FOUND);
        return likesDeals;
    }
};
exports.MyService = MyService;
exports.MyService = MyService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MyService);
//# sourceMappingURL=my.service.js.map