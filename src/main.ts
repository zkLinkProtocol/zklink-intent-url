import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import logger from './logger';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ExceptionsFilter } from './exceptions.filter';

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
    .setTitle('zkIntent API DOCS')
    .setDescription('zkIntent api document.')
    .setVersion('1.0')
    .addTag('API')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document, {
    jsonDocumentUrl: 'swagger/json',
    useGlobalPrefix: true,
    customSiteTitle: 'zkIntent docs',
  });

  app.enableShutdownHooks();
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new ExceptionsFilter());

  const port = configService.get<string>('port');
  await app.listen(port);
  logger.log(`App was listened port : ${port}`);
}
bootstrap();
