import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { ResponseDto } from './common/response.dto';
import { ExceptionsFilter } from './exception/exceptions.filter';
import logger from './logger';

const API_PREFIX = 'api';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger });
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true,
  });

  const configService = app.get(ConfigService);

  app.enableShutdownHooks();
  app.setGlobalPrefix(API_PREFIX);
  app.useGlobalFilters(new ExceptionsFilter());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('zkIntent api docs')
    .setDescription('zkIntent API documentation, using RESTful style API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig, {
    extraModels: [ResponseDto],
  });
  SwaggerModule.setup('docs', app, document, {
    jsonDocumentUrl: 'swagger/json',
    customSiteTitle: 'zkIntent docs',
  });

  const port = configService.get<string>('port');
  await app.listen(port);
  logger.log(`App was listened port : ${port}`);
}
bootstrap();
