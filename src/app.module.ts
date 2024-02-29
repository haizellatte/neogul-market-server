import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrismaModule } from "./database/prisma/prisma.module";
import { DealsModule } from "./domains/deals/deals.module";
import { DomainsModule } from "./domains/domains.module";
import { AuthGuard } from "./guards/auth.guard";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: "2h" },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "/public/deal_Image"),
    }),
    PassportModule,
    PrismaModule,
    DomainsModule,
    DealsModule,
  ],
  providers: [AppService, { useClass: AuthGuard, provide: APP_GUARD }],
  controllers: [AppController],
})
export class AppModule {}
