import { Injectable } from "@nestjs/common";
import { Deal, Prisma, User } from "@prisma/client";
import { PrismaService } from "src/database/prisma/prisma.service";

@Injectable()
export class DealsService {
  constructor(private prisma: PrismaService) {}

  async createDeal(
    data: Prisma.DealCreateInput,
    user: Pick<User, "email">,
  ): Promise<Deal> {
    return this.prisma.deal.create({
      data,
    });
  }

  async getAllDeals(user: Pick<User, "email">): Promise<Deal[]> {
    return this.prisma.deal.findMany();
  }

  async getDealById(
    id: number,
    user: Pick<User, "email">,
  ): Promise<Deal | null> {
    return this.prisma.deal.findUnique({
      where: { id },
    });
  }

  async updateDeal(
    id: number,
    user: Pick<User, "email">,
    data: Prisma.DealUpdateInput,
  ): Promise<Deal> {
    return this.prisma.deal.update({
      where: { id },
      data,
    });
  }

  async deleteDeal(id: number, user: Pick<User, "email">): Promise<Deal> {
    return this.prisma.deal.delete({
      where: { id },
    });
  }
}
