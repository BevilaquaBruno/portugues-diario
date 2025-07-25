import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as hbs from 'hbs';

const PORT = process.env.NODE_ENV == 'development' ? 3000 : 80;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  app.useStaticAssets('public');
  app.setBaseViewsDir('views');
  app.setViewEngine('hbs');

  hbs.registerPartials('views/partials');

  await app.listen(PORT);
}
bootstrap();
