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
import { CreateDealPostDto } from "./deals.dto";
import { DealsService } from "./deals.service";

@Controller("deals")
export class DealsController {
  constructor(private readonly dealsService: DealsService) {}

  @Post("/create")
  @UserOnly()
  async createDealPost(
    @DUser() user: User,
    @Body() createDealDto: CreateDealPostDto,
  ): Promise<Deal> {
    const DealDto = { ...createDealDto, userEmail: user.email };

    return this.dealsService.createDeal(DealDto);
  }

  @Get()
  findAll(): Promise<Deal[]> {
    return this.dealsService.getAllDeals();
  }

  @Get(":dealId")
  findOne(@Param("dealId", ParseIntPipe) dealId: number): Promise<Deal | null> {
    return this.dealsService.getDealById(dealId);
  }

  // todo :private(user) -> 추가하기

  @Patch(":dealId")
  update(
    @Param("dealId", ParseIntPipe) dealId: number,
    @Body() updateDealDto: Prisma.DealUpdateInput,
  ): Promise<Deal> {
    return this.dealsService.updateDeal(dealId, updateDealDto);
  }

  @Delete("dealId")
  remove(@Param("dealId", ParseIntPipe) dealId: number): Promise<Deal> {
    return this.dealsService.deleteDeal(dealId);
  }

  @Patch(":dealId/toggle-like")
  toggleLike(
    @DUser() user: User,
    @Param("dealId", ParseIntPipe) dealId: number,
  ): Promise<Deal> {
    return this.dealsService.toggleLike(dealId, user.email);
  }

  @Post("upload")
  @UseInterceptors(FileInterceptor, "file")
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any,
  ) {
    const imgUrl = `/uploads/${file.filename}`; //todo 파일 저장 경로를 설정
    //todo 파일 정보와 함께 DB에 저장할 다른 정보들을 처리하는 로직 추가
    // --> this.dealsService.deal.create({...body, imgUrl});
    return { imgUrl }; // 클라이언트에 imgUrl 응답
  }

  @Post(":dealId/img-upload")
  async uploadDealMainImg(@UploadedFile() file: Express.Multer.File) {
    return this.dealsService(file);
  }
}
