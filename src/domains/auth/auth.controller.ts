import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { Request, Response } from "express";
import { JwtAuthGuard } from "src/guards/jwt-auth.guard";
import { UsersAuthDto } from "./auth.dto";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/sign-up")
  async signUp(
    @Body() signUpDto: UsersAuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const accessToken = await this.authService.SignUp(signUpDto);
    //* 생성한 accessTokendmf response cookie에 담아 전송한다.
    res.cookie("Authentication", accessToken, {
      domain: "localhost",
      path: "/",
      secure: true,
      httpOnly: true,
      maxAge: 60 * 60 * 2000, // expire : 2시간
    });
    return accessToken;
  }

  @Post("log-in")
  async LogIn(
    @Body() LogInDto: UsersAuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const accessToken = await this.authService.LogIn(LogInDto);
    //* 생성한 accessTokendmf response cookie에 담아 전송한다.
    res.cookie("Authentication", accessToken, {
      domain: "localhost",
      path: "/",
      secure: true,
      httpOnly: true,
      maxAge: 60 * 60 * 2000, // expire : 2시간
    });
    return accessToken;
  }

  //* 쿠키 파서 (쿠키값 잘 읽어오는지 확인)
  @UseGuards(JwtAuthGuard)
  @Get("/cookie")
  async getCookies(@Req() req: Request, @Res() res: Response) {
    const AuthenticationCookie = req.cookies["Authentication"];
    return res.send(AuthenticationCookie);
  }

  //* log-out
  @UseGuards(JwtAuthGuard)
  @Post("/log-out")
  logOut(@Req() req: Request, @Res() res: Response) {
    //* 로그아웃 시 쿠키 삭제
    res.cookie("Authentication", "cookie", {
      domain: "localhost",
      path: "/",
      secure: true,
      httpOnly: true,
      maxAge: 0,
    });

    return res.json("로그아웃 되었습니다.");
  }
}
