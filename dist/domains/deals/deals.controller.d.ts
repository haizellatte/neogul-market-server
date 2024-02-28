/// <reference types="multer" />
import { Deal, Prisma, User } from "@prisma/client";
import { CreateDealPostDto } from "./deals.dto";
import { DealsService } from "./deals.service";
export declare class DealsController {
    private readonly dealsService;
    constructor(dealsService: DealsService);
    createDealPost(user: User, createDealDto: CreateDealPostDto): Promise<Deal>;
    findAll(): Promise<Deal[]>;
    findOne(dealId: number): Promise<Deal | null>;
    update(dealId: number, updateDealDto: Prisma.DealUpdateInput): Promise<Deal>;
    remove(dealId: number): Promise<Deal>;
    toggleLike(user: User, dealId: number): Promise<Deal>;
    uploadDealMainImg(file: Express.Multer.File): Promise<Express.Multer.File>;
}
