import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { DealsModule } from "./deals/deals.module";

@Module({
  imports: [AuthModule, DealsModule],
  exports: [AuthModule, DealsModule],
})
export class DomainsModule {}
