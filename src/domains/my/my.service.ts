import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService } from "src/database/prisma/prisma.service";

@Injectable()
export class MyService {
  constructor(private readonly prismaService: PrismaService) {}

  async getWrittenDeals(user: User) {
    const writtenDeals = await this.prismaService.user.findMany({
      where: {
        email: user.email,
      },
      include: {
        deals: true,
      },
    });

    if (!writtenDeals)
      throw new HttpException(
        "작성한 게시물이 존재하지 않습니다",
        HttpStatus.NOT_FOUND,
      );

    return writtenDeals;
  }

  async userLikesDeals(user: User) {
    const likesDeals = await this.prismaService.user.findMany({
      where: {
        email: user.email,
      },
      include: {
        likes: true,
      },
    });

    if (!likesDeals)
      throw new HttpException("찜한 게시물이 없습니다.", HttpStatus.NOT_FOUND);

    return likesDeals;
  }
}
