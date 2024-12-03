import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticlesModule } from './articles/articles.module';
import { DbModule } from './db/db.module';

@Module({
  imports: [DbModule, ArticlesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
