import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger ,VersioningType} from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import 'dotenv/config';

async function bootstrap() {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableVersioning({ type: VersioningType.URI });
  app.enableCors();

  const swaggerCconfig = new DocumentBuilder()
  .setTitle('Courier Api')
  .setDescription('This api will help clients to store their data.')
  .setVersion('1.0')
  .addTag('Courier')
  .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerCconfig);

  SwaggerModule.setup('swagger', app, swaggerDocument);
  await app.listen(process.env.PORT);
    

  

  Logger.debug(`Application is running on: http://localhost:${process.env.PORT}`);
  Logger.debug(`Swagger is running on: http://localhost:${process.env.PORT}/swagger`,);
}
bootstrap();