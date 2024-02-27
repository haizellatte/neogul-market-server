import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { JWT_SECRET_KEY } from "./config/jwt.secret";
import { PrismaModule } from "./database/prisma/prisma.module";
import { DomainsModule } from "./domains/domains.module";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { JwtStrategy } from "./strategy/jwt.strategy";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    PassportModule,
    JwtModule.register({
      secret: JWT_SECRET_KEY,
      signOptions: { expiresIn: "2h" },
    }),
    PrismaModule,
    DomainsModule,
  ],
  providers: [
    AppService,
    JwtStrategy,
    { useClass: JwtAuthGuard, provide: APP_GUARD },
  ],
  controllers: [AppController],
})
export class AppModule {}
