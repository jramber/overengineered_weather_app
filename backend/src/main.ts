import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://192.168.0.168:8080',
    methods: 'GET,POST,PUT,PATCH,HEAD,DELETE',
  });
  await app.listen(3001);
}
bootstrap();
