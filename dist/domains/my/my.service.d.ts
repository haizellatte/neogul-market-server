import { User } from "@prisma/client";
import { PrismaService } from "src/database/prisma/prisma.service";
export declare class MyService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    getWrittenDeals(user: User): Promise<({
        deals: {
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
        }[];
    } & {
        id: string;
        email: string;
        encryptedPassword: string;
        createdAt: Date;
    })[]>;
    userLikesDeals(user: User): Promise<({
        likes: {
            id: number;
            dealId: number;
            userEmail: string;
        }[];
    } & {
        id: string;
        email: string;
        encryptedPassword: string;
        createdAt: Date;
    })[]>;
}
