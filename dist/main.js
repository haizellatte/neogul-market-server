"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const cors_1 = require("cors");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        cors: true,
    });
    await app.listen(5050);
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.use((0, cors_1.default)());
}
bootstrap();
//# sourceMappingURL=main.js.map