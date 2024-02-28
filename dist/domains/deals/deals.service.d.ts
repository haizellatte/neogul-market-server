/// <reference types="multer" />
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/database/prisma/prisma.service";
export declare class DealsService {
    private prisma;
    constructor(prisma: PrismaService);
    createDeal(data: Prisma.DealUncheckedCreateInput): Promise<{
        id: number;
        title: string;
        content: string;
        location: string;
        price: number;
        likes: number;
        views: number;
        imgUrl: string;
        userEmail: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getAllDeals(): Promise<{
        id: number;
        title: string;
        content: string;
        location: string;
        price: number;
        likes: number;
        views: number;
        imgUrl: string;
        userEmail: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getDealById(dealId: number): Promise<{
        id: number;
        title: string;
        content: string;
        location: string;
        price: number;
        likes: number;
        views: number;
        imgUrl: string;
        userEmail: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateDeal(dealId: number, data: Prisma.DealUpdateInput): Promise<{
        id: number;
        title: string;
        content: string;
        location: string;
        price: number;
        likes: number;
        views: number;
        imgUrl: string;
        userEmail: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteDeal(dealId: number): Promise<{
        id: number;
        title: string;
        content: string;
        location: string;
        price: number;
        likes: number;
        views: number;
        imgUrl: string;
        userEmail: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    uploadDealImg(file: Express.Multer.File): Promise<Express.Multer.File>;
    toggleLike(dealId: number): Promise<{
        id: number;
        title: string;
        content: string;
        location: string;
        price: number;
        likes: number;
        views: number;
        imgUrl: string;
        userEmail: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
