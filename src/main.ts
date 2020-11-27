import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as nunjucks from 'nunjucks';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('njk');
  nunjucks.configure('views', {
    // ext: 'njk',
    autoescape: false,
    express: app,
    watch: true,
  });
  await app.listen(1026);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
