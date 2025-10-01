import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config'; // ✅ Import ConfigService

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService); // ✅ Get instance of ConfigService
  const frontendUrl = configService.get<string>('FRONTEND_URL'); // ✅ Get frontend URL
  const port = configService.get<number>('PORT'); // ✅ Get port

  // Enable CORS using the environment variable
  app.enableCors({
    origin: frontendUrl, // ✅ Use the variable
    credentials: true,
  });

  // Enables class-validator and class-transformer for all incoming requests
  app.useGlobalPipes(new ValidationPipe());

  // Enables cookie parsing for all incoming requests
  app.use(cookieParser());
  
  // Start the application on the port from the environment variable
  await app.listen(port); // ✅ Use the variable
}
bootstrap();
