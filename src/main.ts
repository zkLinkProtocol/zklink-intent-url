import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import logger from './logger';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger });
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true,
  });

  const configService = app.get(ConfigService);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('ZKIntent API DOCS')
    .setDescription('zkintent api document.')
    .setVersion('1.0')
    .addTag('API')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  app.enableShutdownHooks();
  app.setGlobalPrefix('api');

  const port = configService.get<string>('PORT');
  await app.listen(port);
  logger.log(`App was listend port : ${port}`);
}
bootstrap();
