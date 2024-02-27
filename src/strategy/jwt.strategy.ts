import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";

import { AuthService } from "src/domains/auth/auth.service";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

interface TokenPayload {
  id: string;
  email: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.Authorization;
        },
      ]),
      // Request에서 JWT를 추출하는 방법 중 Header에 Bearer Token 사용
      ignoreExpiration: false, // jwt 보증을 passport 모듈에 위임함. 만료된 JWT인경우 request거부, 401 response
      secretOrKey: JWT_SECRET_KEY, // token 발급에 사용할 시크릿 키
    });
  }
  async validate(payload: TokenPayload) {
    return this.authService.getUserByEmail(payload.email);
  }
}
