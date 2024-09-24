import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { ArticlesService } from './articles.service';
import { UpdateArticleDto } from './dto/update-article.dto';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}
  @Post()
  create(
    @Body(new ValidationPipe({ whitelist: true, stopAtFirstError: true }))
    createArticleDto: CreateArticleDto,
  ) {
    console.log(createArticleDto);
    return this.articlesService.create(createArticleDto);
  }

  @Get()
  findAll() {
    return this.articlesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.articlesService.findOne(id);
  }

  @Put(':id')
  update(
    @Body(
      new ValidationPipe({
        whitelist: true,
        stopAtFirstError: true,
      }),
    )
    updateArticleDto: UpdateArticleDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    console.log(updateArticleDto, id);
    return this.articlesService.update(id, updateArticleDto);
  }

  @Delete(':id')
  remove() {
    return 'This action removes a #id article';
  }
}
