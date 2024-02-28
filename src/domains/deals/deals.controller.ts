// import {
//   Body,
//   Controller,
//   Delete,
//   Get,
//   Param,
//   ParseIntPipe,
//   Patch,
//   Post,
//   UploadedFile,
// } from "@nestjs/common";
// import { Deal, Prisma, User } from "@prisma/client";
// import { DUser } from "src/decorators/DUser";
// import { UserOnly } from "src/decorators/user.only";
// import { DealsService } from "./deals.service";

// @Controller("deals")
// export class DealsController {
//   constructor(private readonly dealsService: DealsService) {}

//   @Post("/create")
//   @UserOnly()
//   async createDealPost(
//     @DUser() user: User,
//     @Body() createDealDto: Prisma.DealCreateWithoutUserInput,
//   ): Promise<Deal> {
//     const DealDto = { ...createDealDto, userEmail: user.email };

//     return this.dealsService.createDeal(DealDto);
//   }

//   @Get()
//   findAll(): Promise<Deal[]> {
//     return this.dealsService.getAllDeals();
//   }

//   @Get(":dealId")
//   findOne(@Param("dealId", ParseIntPipe) dealId: number): Promise<Deal | null> {
//     return this.dealsService.getDealById(dealId);
//   }

//   // todo :private(user) -> 추가하기

//   @Patch(":dealId")
//   update(
//     @Param("dealId", ParseIntPipe) dealId: number,
//     @Body() updateDealDto: Prisma.DealUpdateInput,
//   ): Promise<Deal> {
//     return this.dealsService.updateDeal(dealId, updateDealDto);
//   }

//   @Delete("dealId")
//   remove(@Param("dealId", ParseIntPipe) dealId: number): Promise<Deal> {
//     return this.dealsService.deleteDeal(dealId);
//   }

//   @Patch(":dealId/toggle-like")
//   toggleLike(
//     @DUser() user: User,
//     @Param("dealId", ParseIntPipe) dealId: number,
//   ): Promise<Deal> {
//     return this.dealsService.toggleLike(dealId, user.email);
//   }

//   @Post(":dealId/img-upload")
//   async uploadDealMainImg(@UploadedFile() file: Express.Multer.File) {
//     return this.dealsService.uploadDealImg(file);
//   }
// }

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Deal, Prisma, User } from "@prisma/client";
import { DUser } from "src/decorators/DUser";
import { UserOnly } from "src/decorators/user.only";
import { DealsService } from "./deals.service";

@Controller("deals")
export class DealsController {
  constructor(private readonly dealsService: DealsService) {}

  //* 파일 업로드
  @UseInterceptors(FileInterceptor("file"))
  @Post(":dealId/img-upload")
  async uploadDealMainImg(@UploadedFile() file: Express.Multer.File) {
    return this.dealsService.uploadDealImg(file);
  }

  //* 여기에서 함께 이미지를 저장하기
  @UseInterceptors(FileInterceptor("file"))
  @Post("/")
  @UserOnly()
  async createDealPost(
    @DUser() user: User,
    @Body() createDealDto: Prisma.DealCreateWithoutUserInput,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(file, "file");

    const DealDto = { ...createDealDto, userEmail: user.email };

    return this.dealsService.createDeal(DealDto, file);
  }

  //* All Deals
  @Get()
  findAll(): Promise<Deal[]> {
    return this.dealsService.getAllDeals();
  }

  //* Single dealId get
  @Get(":dealId")
  findOne(@Param("dealId", ParseIntPipe) dealId: number) {
    return this.dealsService.getDealById(dealId);
  }

  // todo :private(user) -> 추가하기

  //* update Deal
  @UseInterceptors(FileInterceptor("file"))
  @Patch(":dealId")
  update(
    @DUser() user: User,
    @Param("dealId", ParseIntPipe) dealId: number,
    @Body() updateDealDto: Prisma.DealUpdateInput,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Deal> {
    const DealDto = { ...updateDealDto, userEmail: user.email };

    return this.dealsService.updateDeal(dealId, DealDto, file, user);
  }

  //* delete dealId
  @Delete(":dealId")
  remove(
    @DUser() user: User,
    @Param("dealId", ParseIntPipe) dealId: number,
  ): Promise<Deal> {
    return this.dealsService.deleteDeal(dealId, user);
  }

  //* toggle-like
  @Patch(":dealId/toggle-like")
  toggleLike(
    @DUser() user: User,
    @Param("dealId", ParseIntPipe) dealId: number,
  ): Promise<Deal> {
    return this.dealsService.toggleLike(dealId, user);
  }
}
