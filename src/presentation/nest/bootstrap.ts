import { NestFactory } from '@nestjs/core';

import { CommonErrorFilter } from './exceptionFilters/Http.filter'; 
import { AppModule, INFRASTRUCTURE_CONSTANTS } from './modules';
import { ConfigAbstractService } from '../../core/application';
import { TypeOrmAbstractConnection } from '../../infrastructure/postgres';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export async function start(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigAbstractService>(INFRASTRUCTURE_CONSTANTS.CONFIG);
  const pg = app.get<TypeOrmAbstractConnection>(INFRASTRUCTURE_CONSTANTS.PG);
  await pg.getClient().initialize();
    
  const swaggerConfig = new DocumentBuilder()
    .setTitle('File Storage API')
    .setDescription('API for file upload and download with authentication')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .addTag('auth', 'Authentication endpoints')
    .addTag('files', 'File management endpoints')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

    app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    disableErrorMessages: false,
  }));
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization',
    credentials: true,
  });
  app.useGlobalFilters(new CommonErrorFilter());
  await app.listen(config.serverConfig.port);
}
