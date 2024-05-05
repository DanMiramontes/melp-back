import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  
  const config = new DocumentBuilder()
  .setTitle('MELP BACKEND TEST')
  .setDescription("Melp's Restaurant Locator API")
  .setVersion('1.0')
  .build()
  const document = SwaggerModule.createDocument(app,config);
  SwaggerModule.setup('Document',app,document);

  await app.listen(process.env.PORT);
}
bootstrap();