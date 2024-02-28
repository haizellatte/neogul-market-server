/// <reference types="multer" />
import { Deal, Prisma } from "@prisma/client";
import { PrismaService } from "src/database/prisma/prisma.service";
export declare class DealsService {
    private prisma;
    constructor(prisma: PrismaService);
    createDeal(data: Prisma.DealUncheckedCreateInput): Promise<Deal>;
    getAllDeals(): Promise<Deal[]>;
    getDealById(dealId: number): Promise<Deal | null>;
    updateDeal(dealId: number, data: Prisma.DealUpdateInput): Promise<Deal>;
    deleteDeal(dealId: number): Promise<Deal>;
    uploadDealImg(file: Express.Multer.File): Promise<Express.Multer.File>;
    toggleLike(dealId: number, userEmail: string): Promise<Deal>;
}
