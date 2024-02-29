import { Controller, Get } from "@nestjs/common";
import { User } from "@prisma/client";
import { DUser } from "src/decorators/DUser";
import { Private } from "src/decorators/Private";
import { MyService } from "./my.service";

@Controller("my")
export class MyController {
  constructor(private readonly myService: MyService) {}

  //* 판매자의 작성글 전체 가져오기
  @Private("user")
  @Get("/")
  getWrittenDeal(@DUser() user: User) {
    // return this.myService.
  }
}
