import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './errors/global.exception';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  try {

    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
      rawBody: true,
    
    });
 
    const httpAdapterHost = app.get(HttpAdapterHost);
    app.useBodyParser('text');
    app.useBodyParser('json', { limit: '20mb' });
    app.enableCors();
    app.setGlobalPrefix('api/v1');

    const config = new DocumentBuilder()
    .setTitle('Ecom')
    .setDescription('API Documentation for ecommerce place order')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'access-token',
        description: 'Enter access-token',
        in: 'header'
      },
      'access-token',
    )
    .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

  
    app.useGlobalFilters(new GlobalExceptionFilter(httpAdapterHost));

    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
      }),
    );
    await app.listen(process.env.PORT||4000);
    console.log("server is running ");
  } catch (error) {
    console.log(error);
    throw error;
  }
}
bootstrap();
