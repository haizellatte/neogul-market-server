import { Body, Controller, Get, Post, Res, UseGuards } from "@nestjs/common";
import { User } from "@prisma/client";
import { Response } from "express";
import { DUser } from "src/decorators/DUser";
import { JwtAuthGuard } from "src/guards/jwt-auth.guard";
import { UsersAuthDto } from "./auth.dto";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //* sign-up
  @Post("/sign-up")
  async signUp(@Body() signUpDto: UsersAuthDto) {
    const accessToken = await this.authService.SignUp(signUpDto);
    return accessToken;
  }

  //* log-in
  @Post("log-in")
  async LogIn(@Body() LogInDto: UsersAuthDto) {
    const accessToken = await this.authService.LogIn(LogInDto);
    return accessToken;
  }

  //* log-out
  @UseGuards(JwtAuthGuard)
  @Post("/log-out")
  logOut(@Res() res: Response) {
    return res.json("로그아웃 되었습니다.");
  }

  //* refreshToken 발급
  @UseGuards(JwtAuthGuard)
  @Get("refreshed-token")
  async refreshToken(@DUser() user: User) {
    const accessToken = await this.authService.refreshToken(user);
    return accessToken;
  }
}
