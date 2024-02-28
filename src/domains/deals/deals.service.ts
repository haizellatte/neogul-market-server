import { Injectable } from "@nestjs/common";
import { Deal, Prisma } from "@prisma/client";
import { PrismaService } from "src/database/prisma/prisma.service";

@Injectable()
export class DealsService {
  constructor(private prisma: PrismaService) {}

  //* create-deal
  async createDeal(data: Prisma.DealUncheckedCreateInput): Promise<Deal> {
    return this.prisma.deal.create({
      data,
    });
  }

  //* get-all-deal
  async getAllDeals(): Promise<Deal[]> {
    return this.prisma.deal.findMany();
  }

  //* get-by-dealId
  async getDealById(dealId: number): Promise<Deal | null> {
    return this.prisma.deal.findUnique({
      where: { id: dealId },
    });
  }

  //* update-deal
  async updateDeal(
    dealId: number,
    data: Prisma.DealUpdateInput,
  ): Promise<Deal> {
    return this.prisma.deal.update({
      where: { id: dealId },
      data,
    });
  }

  //* delete-deal
  async deleteDeal(dealId: number): Promise<Deal> {
    return this.prisma.deal.delete({
      where: { id: dealId },
    });
  }

  //* toggle-like
  async toggleLike(dealId: number, userEmail: string): Promise<Deal> {
    const like = await this.prisma.like.findUnique({
      where: {
        dealId_userId: {
          dealId,
          userEmail,
        },
      },
    });

    //* 이미 좋아요 되어있다면 👉 -1 취소(delete)
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
    //* 아니라면 👉 +1 create
    else {
      await this.prisma.like.create({
        data: {
          dealId,
          userEmail,
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
}
