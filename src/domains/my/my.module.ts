import { Module } from "@nestjs/common";
import { MyController } from "./my.controller";
import { MyService } from "./my.service";

@Module({
  providers: [MyService],
  controllers: [MyController],
  exports: [MyService],
})
export class MyModule {}
