/// <reference types="multer" />
import { Deal, Prisma } from "@prisma/client";
import { DealsService } from "./deals.service";
export declare class DealsController {
    private readonly dealsService;
    constructor(dealsService: DealsService);
    createDealPost(createDealDto: Prisma.DealCreateWithoutUserInput): Promise<{
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
    findAll(): Promise<Deal[]>;
    findOne(dealId: number): Promise<{
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
    update(dealId: number, updateDealDto: Prisma.DealUpdateInput): Promise<Deal>;
    remove(dealId: number): Promise<Deal>;
    toggleLike(dealId: number): Promise<Deal>;
    uploadDealMainImg(file: Express.Multer.File): Promise<Express.Multer.File>;
}
