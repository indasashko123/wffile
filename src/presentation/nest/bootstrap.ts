import { NestFactory } from '@nestjs/core';
import { IoAdapter } from '@nestjs/platform-socket.io';
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
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization, X-Requested-With, Range',
    exposedHeaders: 'Content-Range, X-Content-Range',
    credentials: true,
  });
  app.useWebSocketAdapter(new IoAdapter(app));
  app.useGlobalFilters(new CommonErrorFilter());
  await app.listen(config.serverConfig.port);
}
