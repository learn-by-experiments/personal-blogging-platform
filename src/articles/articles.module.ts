import { Module } from '@nestjs/common';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { DbModule } from 'src/db/db.module';

@Module({
  controllers: [ArticlesController],
  providers: [ArticlesService],
  imports: [],
})
export class ArticlesModule {}
