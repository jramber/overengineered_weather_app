import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const PORT = configService.get('PORT');
  const AWS_IP = configService.get('AWS_IP');
  const WEB_PORT = configService.get('WEB_PORT');

  app.enableCors({
    origin: `http://${AWS_IP}:${WEB_PORT}`,
    methods: 'GET,POST,PUT,PATCH,HEAD,DELETE',
  });
  await app.listen(PORT);
}
bootstrap();
