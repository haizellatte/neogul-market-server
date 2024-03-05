import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { UsersAuthDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  //* accessToken 발급
  async generateAccessToken(user: Pick<User, 'id' | 'email'>): Promise<string> {
    const accessToken = sign(
      { email: user.email },
      process.env.JWT_SECRET_KEY,
      {
        // id ❗️❗️❗️❗️❗️
        subject: String(user.id),
        // expiresIn: "5m",
        expiresIn: '2h',
      },
    );
    return accessToken;
  }

  //* refreshToken 발급
  refreshToken(user: User) {
    const refreshdAccessTocken = this.generateAccessToken(user);
    return refreshdAccessTocken;
  }

  //* 사용자 찾기
  async getUserByEmail(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) throw new BadRequestException('Invalid email or password');

    return user;
  }

  //* sign-up
  async SignUp(signUpDto: UsersAuthDto): Promise<{
    accessToken: string;
  }> {
    const { email, password } = signUpDto;

    //* 이미 회원가입한 유저인지 확인
    const findUser = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
    if (findUser) throw new BadRequestException('User is already exists!');

    const encryptedPassword = await hash(password, 15);

    const user = await this.prismaService.user.create({
      data: {
        email,
        encryptedPassword,
      },
    });

    const accessToken = await this.generateAccessToken(user);
    return { accessToken };
  }

  //* log-in
  async LogIn(logInDto: UsersAuthDto): Promise<{
    accessToken: string;
  }> {
    const { email, password } = logInDto;

    //* 회원가입한 유저인지 확인
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) throw new BadRequestException('Invalid email or password');

    const encryptedPassword = await compare(password, user.encryptedPassword);
    if (!encryptedPassword)
      throw new BadRequestException('Invalid email or password');

    const accessToken = await this.generateAccessToken(user);
    return { accessToken };
  }

  //* log-out
  async LogOut(user: Pick<User, 'id' | 'email'>) {
    const loggedOutUser = await this.prismaService.user.delete({
      where: {
        email: user.email,
      },
    });

    if (!loggedOutUser)
      throw new BadRequestException('존재하지 않은 유저입니다.');

    return loggedOutUser;
  }

  async UserEmail(user: Pick<User, 'email'>) {
    const FindUser = await this.prismaService.user.findUnique({
      where: {
        email: user.email,
      },
      select: {
        email: true,
      },
    });
    return FindUser;
  }
}
