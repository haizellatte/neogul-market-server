import { IsEmail, IsString, Min } from "class-validator";

export class UsersAuthDto {
  @IsString()
  @IsEmail()
  email: string;

  @Min(8)
  @IsString()
  password: string;
}
