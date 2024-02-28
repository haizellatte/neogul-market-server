/// <reference types="multer" />
import { Prisma, User } from "@prisma/client";
import { PrismaService } from "src/database/prisma/prisma.service";
export declare class DealsService {
    private prisma;
    constructor(prisma: PrismaService);
    uploadDealImg(file: Express.Multer.File): Promise<string>;
    createDeal(data: Prisma.DealUncheckedCreateInput, file: Express.Multer.File): Promise<{
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
    updateDeal(dealId: number, data: Prisma.DealUpdateInput, file: Express.Multer.File, user: User): Promise<{
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
    deleteDeal(dealId: number, user: User): Promise<{
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
    toggleLike(dealId: number, user: User): Promise<{
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
