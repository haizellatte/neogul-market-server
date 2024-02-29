"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const http_exception_filter_1 = require("./filters/http.exception.filter");
async function myServer() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        cors: true,
    });
    await app.listen(5050);
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
}
myServer();
//# sourceMappingURL=main.js.map