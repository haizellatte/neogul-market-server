import { BadRequestException, Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { compare, hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import { PrismaService } from "src/database/prisma/prisma.service";
import { UsersAuthDto } from "./auth.dto";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "";

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  //* accessToken 발급
  async generateAccessToken(user: Pick<User, "id" | "email">): Promise<string> {
    const accessToken = sign(
      { id: user.id, email: user.email },
      JWT_SECRET_KEY,
      {
        subject: String(user.id),
        expiresIn: "2h",
      },
    );
    return accessToken;
  }

  //* sign-up
  async SignUp(signUpDto: UsersAuthDto) {
    const { email, password } = signUpDto;

    //* 이미 회원가입한 유저인지 확인
    const findUser = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
    if (findUser) throw new BadRequestException("User is already exists!");

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
  async LogIn(logInDto: UsersAuthDto) {
    const { email, password } = logInDto;

    //* 회원가입한 유저인지 확인
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) throw new BadRequestException("Invalid email or password");

    const encryptedPassword = await compare(password, user.encryptedPassword);
    if (!encryptedPassword)
      throw new BadRequestException("Invalid email or password");

    const accessToken = await this.generateAccessToken(user);
    return { accessToken };
  }
}
