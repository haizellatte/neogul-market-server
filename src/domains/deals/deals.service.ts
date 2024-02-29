import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Prisma, User } from "@prisma/client";
import * as fs from "fs/promises";
import { join } from "path";
import { PrismaService } from "src/database/prisma/prisma.service";
import { v4 as uuid } from "uuid";

@Injectable()
export class DealsService {
  constructor(private prismaService: PrismaService) {}

  //* create-deal
  async createDeal(
    data: Prisma.DealUncheckedCreateInput,
    file: Express.Multer.File,
    user: User,
  ) {
    //* 어디에 저장할 건지 + 파일명 + 파일 확장자 -> 경로
    //* 1. file 객체에 있는 버퍼 저장하기
    const bufferImgFile = file.buffer;
    //* 2. unique한 name 만들어 저장
    const fileName = uuid();
    //* 3. 파일 확장자
    const fileExtension = file.originalname.split(".").slice(-1);

    const path = join(
      __dirname,
      `../../../public/deal_Image`,
      `${fileName}.${fileExtension}`,
    );

    await fs.writeFile(path, bufferImgFile);

    return this.prismaService.deal.create({
      data: {
        title: data.title,
        content: data.content,
        price: Number(data.price),
        location: data.location,
        imgUrl: `${fileName}.${fileExtension}`,
        userEmail: user.email,
      },
    });
  }

  //* get-all-deal
  async getAllDeals() {
    return this.prismaService.deal.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  //* get-by-dealId
  async getDealById(dealId: number) {
    const result = await this.prismaService.deal.findUnique({
      where: { id: dealId },
    });

    //* 해당 글을 클릭하면 view 수 올리기
    await this.prismaService.deal.update({
      where: { id: dealId },
      data: {
        views: {
          increment: 1,
        },
      },
    });

    return result;
  }

  //* update-deal
  async updateDeal(
    dealId: number,
    data: Prisma.DealUpdateInput,
    file: Express.Multer.File,
    user: User,
  ) {
    //* 어디에 저장할 건지 + 파일명 + 파일 확장자 -> 경로
    //* 1. file 객체에 있는 버퍼 저장하기
    const bufferImgFile = file.buffer;
    //* 2. unique한 name 만들어 저장
    const fileName = uuid();
    //* 3. 파일 확장자
    const fileExtension = file.originalname.split(".").slice(-1);

    const path = join(
      __dirname,
      `../../../public/deal_Image`,
      `${fileName}.${fileExtension}`,
    );

    await fs.writeFile(path, bufferImgFile);

    const deal = this.prismaService.deal.update({
      where: { id: dealId },
      data: {
        title: data.title,
        content: data.content,
        price: Number(data.price),
        location: data.location,
        imgUrl: `${fileName}.${fileExtension}`,
        userEmail: user.email,
      },
    });

    if (!deal)
      throw new HttpException(
        "해당 게시물이 존재하지 않습니다",
        HttpStatus.NOT_FOUND,
      );

    return deal;
  }

  //* delete-deal
  async deleteDeal(dealId: number, user: User) {
    return this.prismaService.deal.delete({
      where: {
        id: dealId,
        userEmail: user.email,
      },
    });
  }

  //* toggle-like
  async toggleLike(dealId: number, user: User) {
    const like = await this.prismaService.like.findUnique({
      where: {
        dealId_userEmail: {
          dealId,
          userEmail: user.email,
        },
      },
    });

    //* 이미 좋아요 되어있다면 👉 -1 취소(delete)
    if (like) {
      await this.prismaService.like.delete({
        where: {
          id: like.id,
        },
      });

      return this.prismaService.deal.update({
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
      await this.prismaService.like.create({
        data: {
          dealId,
          userEmail: user.email,
        },
      });

      return this.prismaService.deal.update({
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
