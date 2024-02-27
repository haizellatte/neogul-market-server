"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const jwt_secret_1 = require("./config/jwt.secret");
const prisma_module_1 = require("./database/prisma/prisma.module");
const deals_module_1 = require("./domains/deals/deals.module");
const domains_module_1 = require("./domains/domains.module");
const jwt_auth_guard_1 = require("./guards/jwt-auth.guard");
const jwt_strategy_1 = require("./strategy/jwt.strategy");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: ".env",
            }),
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: jwt_secret_1.JWT_SECRET_KEY,
                signOptions: { expiresIn: "2h" },
            }),
            prisma_module_1.PrismaModule,
            domains_module_1.DomainsModule,
            deals_module_1.DealsModule,
        ],
        providers: [
            app_service_1.AppService,
            jwt_strategy_1.JwtStrategy,
            { useClass: jwt_auth_guard_1.JwtAuthGuard, provide: core_1.APP_GUARD },
        ],
        controllers: [app_controller_1.AppController],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map