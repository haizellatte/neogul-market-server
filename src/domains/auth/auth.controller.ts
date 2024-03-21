import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { DUser } from 'src/decorators/DUser';
import { Private } from 'src/decorators/Private';
import { UsersAuthDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //* sign-up
  @Post('/sign-up')
  async signUp(@Body() signUpDto: UsersAuthDto) {
    const accessToken = await this.authService.SignUp(signUpDto);
    return accessToken;
  }

  //* log-in
  @Post('log-in')
  async LogIn(@Body() LogInDto: UsersAuthDto) {
    const accessToken = await this.authService.LogIn(LogInDto);
    return accessToken;
  }

  //* log-out
  @Private('user')
  @Delete('/log-out')
  logOut(@DUser() user: User) {
    return this.authService.LogOut(user);
  }

  //* refreshToken 발급
  @Private('user')
  @Get('refresh-token')
  async refreshToken(@DUser() user: User) {
    const accessToken = await this.authService.refreshToken(user!);
    return accessToken;
  }

  @Private('user')
  @Get('/user-email')
  async findUser(@DUser() user: User) {
    const findUser = await this.authService.UserEmail(user);

    return findUser;
  }
}
