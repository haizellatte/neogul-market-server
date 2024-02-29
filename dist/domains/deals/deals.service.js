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
exports.DealsService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs/promises");
const path_1 = require("path");
const prisma_service_1 = require("../../database/prisma/prisma.service");
const uuid_1 = require("uuid");
let DealsService = class DealsService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async createDeal(data, file, user) {
        const bufferImgFile = file.buffer;
        const fileName = (0, uuid_1.v4)();
        const fileExtension = file.originalname.split(".").slice(-1);
        const path = (0, path_1.join)(__dirname, `../../../public/deal_Image`, `${fileName}.${fileExtension}`);
        await fs.writeFile(path, bufferImgFile);
        return this.prismaService.deal.create({
            data: {
                title: data.title,
                content: data.content,
                price: Number(data.price),
                location: data.location,
                imgUrl: `${fileName}.${fileExtension}`,
                userEmail: user.email,
            },
        });
    }
    async getAllDeals() {
        return this.prismaService.deal.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
    }
    async getDealById(dealId) {
        const result = await this.prismaService.deal.findUnique({
            where: { id: dealId },
        });
        await this.prismaService.deal.update({
            where: { id: dealId },
            data: {
                views: {
                    increment: 1,
                },
            },
        });
        return result;
    }
    async updateDeal(dealId, data, file, user) {
        const bufferImgFile = file.buffer;
        const fileName = (0, uuid_1.v4)();
        const fileExtension = file.originalname.split(".").slice(-1);
        const path = (0, path_1.join)(__dirname, `../../../public/deal_Image`, `${fileName}.${fileExtension}`);
        await fs.writeFile(path, bufferImgFile);
        const deal = this.prismaService.deal.update({
            where: { id: dealId },
            data: {
                title: data.title,
                content: data.content,
                price: Number(data.price),
                location: data.location,
                imgUrl: `${fileName}.${fileExtension}`,
                userEmail: user.email,
            },
        });
        if (!deal)
            throw new common_1.HttpException("해당 게시물이 존재하지 않습니다", common_1.HttpStatus.NOT_FOUND);
        return deal;
    }
    async deleteDeal(dealId, user) {
        return this.prismaService.deal.delete({
            where: {
                id: dealId,
                userEmail: user.email,
            },
        });
    }
    async toggleLike(dealId, user) {
        const like = await this.prismaService.like.findUnique({
            where: {
                dealId_userEmail: {
                    dealId,
                    userEmail: user.email,
                },
            },
        });
        if (like) {
            await this.prismaService.like.delete({
                where: {
                    id: like.id,
                },
            });
            return this.prismaService.deal.update({
                where: { id: dealId },
                data: {
                    likes: {
                        decrement: 1,
                    },
                },
            });
        }
        else {
            await this.prismaService.like.create({
                data: {
                    dealId,
                    userEmail: user.email,
                },
            });
            return this.prismaService.deal.update({
                where: { id: dealId },
                data: {
                    likes: {
                        increment: 1,
                    },
                },
            });
        }
    }
};
exports.DealsService = DealsService;
exports.DealsService = DealsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DealsService);
//# sourceMappingURL=deals.service.js.map