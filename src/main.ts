import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  console.log(dotenv.config());
  app.enableCors();
  await app.listen(3000, () => {
    console.log('app listening on http://localhost:3000');
  });
}
bootstrap();
