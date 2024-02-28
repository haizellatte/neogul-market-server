/// <reference types="multer" />
import { Deal, Prisma, User } from "@prisma/client";
import { DealsService } from "./deals.service";
export declare class DealsController {
    private readonly dealsService;
    constructor(dealsService: DealsService);
    uploadDealMainImg(file: Express.Multer.File): Promise<string>;
    createDealPost(user: User, createDealDto: Prisma.DealCreateWithoutUserInput, file: Express.Multer.File): Promise<{
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
    update(user: User, dealId: number, updateDealDto: Prisma.DealUpdateInput, file: Express.Multer.File): Promise<Deal>;
    remove(user: User, dealId: number): Promise<Deal>;
    toggleLike(user: User, dealId: number): Promise<Deal>;
}
