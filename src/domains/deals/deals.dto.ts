import { Prisma } from "@prisma/client";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class DealPostDto {
  @IsString()
  @IsNotEmpty()
  title: String;

  @IsString()
  @IsNotEmpty()
  content: String;

  @IsString()
  @IsNotEmpty()
  location: String;

  @IsNumber()
  price: Number;

  @IsNumber()
  likes: Number;

  @IsNumber()
  views: Number;

  @IsString()
  imgUrl?: string;
}

export type CreateDealPostDto = Prisma.DealCreateWithoutUserInput;
