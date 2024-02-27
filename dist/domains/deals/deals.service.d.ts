import { Deal, Prisma, User } from "@prisma/client";
import { PrismaService } from "src/database/prisma/prisma.service";
export declare class DealsService {
    private prisma;
    constructor(prisma: PrismaService);
    createDeal(data: Prisma.DealCreateInput, user: Pick<User, "email">): Promise<Deal>;
    getAllDeals(user: Pick<User, "email">): Promise<Deal[]>;
    getDealById(id: number, user: Pick<User, "email">): Promise<Deal | null>;
    updateDeal(id: number, user: Pick<User, "email">, data: Prisma.DealUpdateInput): Promise<Deal>;
    deleteDeal(id: number, user: Pick<User, "email">): Promise<Deal>;
}
