// import { Injectable } from "@nestjs/common";
// import { Deal, Prisma } from "@prisma/client";
// import * as fs from "fs/promises";
// import { PrismaService } from "src/database/prisma/prisma.service";

// @Injectable()
// export class DealsService {
//   constructor(private prisma: PrismaService) {}

//   //* create-deal
//   async createDeal(data: Prisma.DealUncheckedCreateInput): Promise<Deal> {
//     return this.prisma.deal.create({
//       data,
//     });
//   }

//   //* get-all-deal
//   async getAllDeals(): Promise<Deal[]> {
//     return this.prisma.deal.findMany();
//   }

//   //* get-by-dealId
//   async getDealById(dealId: number): Promise<Deal | null> {
//     return this.prisma.deal.findUnique({
//       where: { id: dealId },
//     });
//   }

//   //* update-deal
//   async updateDeal(
//     dealId: number,
//     data: Prisma.DealUpdateInput,
//   ): Promise<Deal> {
//     return this.prisma.deal.update({
//       where: { id: dealId },
//       data,
//     });
//   }

//   //* delete-deal
//   async deleteDeal(dealId: number): Promise<Deal> {
//     return this.prisma.deal.delete({
//       where: { id: dealId },
//     });
//   }

//   //* img-upload
//   async uploadDealImg(file: Express.Multer.File) {
//     await fs.writeFile(`./public/${file.originalname}`, file.buffer, "base64");

//     return file;
//   }

//   //* toggle-like
//   async toggleLike(dealId: number, userEmail: string): Promise<Deal> {
//     const like = await this.prisma.like.findUnique({
//       where: {
//         dealId_userEmail: {
//           dealId,
//           userEmail,
//         },
//       },
//     });

//     //* 이미 좋아요 되어있다면 👉 -1 취소(delete)
//     if (like) {
//       await this.prisma.like.delete({
//         where: {
//           id: like.id,
//         },
//       });

//       return this.prisma.deal.update({
//         where: { id: dealId },
//         data: {
//           likes: {
//             decrement: 1,
//           },
//         },
//       });
//     }
//     //* 아니라면 👉 +1 create
//     else {
//       await this.prisma.like.create({
//         data: {
//           dealId,
//           userEmail,
//         },
//       });

//       return this.prisma.deal.update({
//         where: { id: dealId },
//         data: {
//           likes: {
//             increment: 1,
//           },
//         },
//       });
//     }
//   }
// }

import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Prisma, User } from "@prisma/client";
import * as fs from "fs/promises";
import { join } from "path";
import { PrismaService } from "src/database/prisma/prisma.service";
import { v4 as uuid } from "uuid";

@Injectable()
export class DealsService {
  constructor(private prisma: PrismaService) {}

  //* img-upload 저장하기 (create)
  async uploadDealImg(file: Express.Multer.File) {
    //* file 객체에 있는 버퍼 저장하기
    const bufferImgFile = file.buffer;
    //* unique한 name 만들어 저장
    const fileName = uuid();
    const extension = file.originalname.split(".").slice(-1)[0];
    await fs.writeFile(
      `./public/deal_Image/${fileName}.${extension}`,
      bufferImgFile,
      "base64",
    );

    const resultImgUrl = `${process.env.SERVER_URL}/deal_Image/${fileName}.${extension}`;

    return resultImgUrl;
  }

  //* create-deal
  async createDeal(
    data: Prisma.DealUncheckedCreateInput,
    file: Express.Multer.File,
  ) {
    //* file 객체에 있는 버퍼 저장하기
    const bufferImgFile = file.buffer;
    //* unique한 name 만들어 저장
    const fileName = uuid();
    const extension = file.originalname.split(".").slice(-1)[0];
    const path = join(
      __dirname,
      `./../../public/deal_Image`,
      `${fileName}.${extension}`,
    );

    await fs.writeFile(path, bufferImgFile, "base64");

    return this.prisma.deal.create({
      data: {
        title: data.title,
        content: data.content,
        price: data.price,
        location: data.location,
        imgUrl: `/${fileName}.${extension}`,
        user: {
          connect: {
            email: data.userEmail,
          },
        },
      },
    });
  }

  //* get-all-deal
  async getAllDeals() {
    return this.prisma.deal.findMany();
  }

  //* get-by-dealId
  async getDealById(dealId: number) {
    const result = await this.prisma.deal.findUnique({
      where: { id: dealId },
    });

    //* 해당 글을 클릭하면 view 수 올리기
    await this.prisma.deal.update({
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
    //* file 객체에 있는 버퍼 저장하기
    const bufferImgFile = file.buffer;
    //* unique한 name 만들어 저장
    const fileName = uuid();
    const extension = file.originalname.split(".").slice(-1)[0];
    const path = join(
      __dirname,
      `./../../public/deal_Image`,
      `${fileName}.${extension}`,
    );

    await fs.writeFile(path, bufferImgFile, "base64");

    const deal = this.prisma.deal.update({
      where: { id: dealId },
      data: {
        title: data.title,
        content: data.content,
        price: data.price,
        location: data.location,
        imgUrl: `/${fileName}.${extension}`,
        user: {
          connect: {
            email: user.email,
          },
        },
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
    return this.prisma.deal.delete({
      where: {
        id: dealId,
        userEmail: user.email,
      },
    });
  }

  //* toggle-like
  async toggleLike(dealId: number, user: User) {
    const like = await this.prisma.like.findUnique({
      where: {
        dealId_userEmail: {
          dealId,
          userEmail: user.email,
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
          userEmail: "user1@naver.com",
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
