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
const prisma_service_1 = require("../../database/prisma/prisma.service");
let DealsService = class DealsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createDeal(data) {
        return this.prisma.deal.create({
            data,
        });
    }
    async getAllDeals() {
        return this.prisma.deal.findMany();
    }
    async getDealById(dealId) {
        const result = await this.prisma.deal.findUnique({
            where: { id: dealId },
        });
        await this.prisma.deal.update({
            where: { id: dealId },
            data: {
                views: {
                    increment: 1,
                },
            },
        });
        return result;
    }
    async updateDeal(dealId, data) {
        const deal = this.prisma.deal.update({
            where: { id: dealId },
            data,
        });
        if (!deal)
            throw new common_1.HttpException("해당 게시물이 존재하지 않습니다", common_1.HttpStatus.NOT_FOUND);
        return deal;
    }
    async deleteDeal(dealId) {
        return this.prisma.deal.delete({
            where: { id: dealId },
        });
    }
    async uploadDealImg(file) {
        await fs.writeFile(`./public/${file.originalname}`, file.buffer, "base64");
        return file;
    }
    async toggleLike(dealId) {
        const like = await this.prisma.like.findUnique({
            where: {
                dealId_userEmail: {
                    dealId,
                    userEmail: "user1@naver.com",
                },
            },
        });
        if (like) {
            await this.prisma.like.delete({
                where: {
                    id: like.id,
                },
            });
            return this.prisma.deal.update({
                where: { id: dealId },
                data: {
                    likes: {
                        decrement: 1,
                    },
                },
            });
        }
        else {
            await this.prisma.like.create({
                data: {
                    dealId,
                    userEmail: "user1@naver.com",
                },
            });
            return this.prisma.deal.update({
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