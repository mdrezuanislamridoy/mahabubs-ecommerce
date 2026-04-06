import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Base path for API
  app.setGlobalPrefix('api');
  
  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('E-Commerce API')
    .setDescription('Full backend documentation for the NestJS E-Commerce system.')
    .setVersion('1.0')
    .addBearerAuth() // Support JWT in Swagger
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  
  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // Enable CORS if needed
  app.enableCors();

  await app.listen(process.env.PORT ?? 3090);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
