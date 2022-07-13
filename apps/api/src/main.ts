/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3333;

  const config = new DocumentBuilder()
    .setTitle('MealTime API')
    .setDescription('The MealTime API description')
    .setVersion('0.1')
    .setBasePath(globalPrefix)
    .setContact(
      'Andreas Petersen',
      'https://www.linkedin.com/in/andreasgdp/',
      'andreasgdp@gmail.com'
    )
    .setExternalDoc('GitHub WiKi', 'https://github.com/BHelpful/MealTime/wiki')
    .setLicense('GPLv3', 'https://www.gnu.org/licenses/gpl-3.0.en.html')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
