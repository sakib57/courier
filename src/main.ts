import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = 3000;
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const swaggerCconfig = new DocumentBuilder()
    .setTitle('Courier Api')
    .setDescription('This api will help clients to store their data.')
    .setVersion('1.0')
    .addTag('Courier')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerCconfig);

  SwaggerModule.setup('swagger', app, swaggerDocument);

  app.setGlobalPrefix('api');
  await app.listen(port);
  console.log('App is running at port: ' + port);
}
bootstrap();
