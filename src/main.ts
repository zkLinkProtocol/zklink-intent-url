import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import logger from './logger';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ExceptionsFilter } from './exception/exceptions.filter';
import { ResponseDto } from './common/response.dto';

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
    .setBasePath(API_PREFIX)
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
