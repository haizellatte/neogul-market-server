import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-local";
import { JWT_SECRET_KEY } from "src/config/jwt.secret";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => {
          return request?.cookies?.Authorization;
        },
      ]),
      // Request에서 JWT를 추출하는 방법 중 Header에 Bearer Token 사용
      ignoreExpiration: false, // jwt 보증을 passport 모듈에 위임함. 만료된 JWT인경우 request거부, 401 response
      secretOrKey: JWT_SECRET_KEY, // token 발급에 사용할 시크릿 키
    });
  }
  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
