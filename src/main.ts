import { INestApplication, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { HttpExceptionFilter } from "./filters/http.exception.filter";
import { TransformInterceptor } from "./interceptors/transform.interceptor";

async function myServer() {
  const app = await NestFactory.create<INestApplication>(AppModule, {
    cors: true,
  });
  await app.listen(5050);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
}

myServer();
