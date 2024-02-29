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
import { Private } from "src/decorators/Private";
import { DealsService } from "./deals.service";

@Controller("deals")
export class DealsController {
  constructor(private readonly dealsService: DealsService) {}

  //* create
  @UseInterceptors(FileInterceptor("imgUrl"))
  @Private("user")
  @Post("/")
  async createDealPost(
    @DUser() user: User,
    @Body() createDealDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.dealsService.createDeal(createDealDto, file, user);
  }

  //* All Deals
  @Get("/")
  findAll(): Promise<Deal[]> {
    return this.dealsService.getAllDeals();
  }

  //* Single dealId get
  @Get(":dealId")
  findOne(@Param("dealId", ParseIntPipe) dealId: number) {
    return this.dealsService.getDealById(dealId);
  }

  //* update Deal
  @UseInterceptors(FileInterceptor("imgUrl"))
  @Private("user")
  @Patch(":dealId")
  update(
    @DUser() user: User,
    @Param("dealId", ParseIntPipe) dealId: number,
    @Body() updateDealDto: Prisma.DealUpdateInput,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Deal> {
    return this.dealsService.updateDeal(dealId, updateDealDto, file, user);
  }

  //* delete dealId
  @Private("user")
  @Delete(":dealId")
  remove(
    @DUser() user: User,
    @Param("dealId", ParseIntPipe) dealId: number,
  ): Promise<Deal> {
    return this.dealsService.deleteDeal(dealId, user);
  }

  //* toggle-like
  @Private("user")
  @Patch(":dealId/toggle-like")
  toggleLike(
    @DUser() user: User,
    @Param("dealId", ParseIntPipe) dealId: number,
  ): Promise<Deal> {
    return this.dealsService.toggleLike(dealId, user);
  }
}
