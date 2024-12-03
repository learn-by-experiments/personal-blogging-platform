import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { ArticlesService } from './articles.service';
import { UpdateArticleDto } from './dto/update-article.dto';
import { error } from 'console';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}
  @Post()
  create(
    @Body(new ValidationPipe({ whitelist: true, stopAtFirstError: true }))
    createArticleDto: CreateArticleDto,
  ) {
    return this.articlesService.create(createArticleDto);
  }

  @Get()
  findAll() {
    return this.articlesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const article = await this.articlesService.findOne(id);
    if (!article) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `Article having id: ${id} doesn't exist.`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return article;
  }

  @Put(':id')
  async update(
    @Body(
      new ValidationPipe({
        whitelist: true,
        stopAtFirstError: true,
      }),
    )
    updateArticleDto: UpdateArticleDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    try {
      const updatedArticle = await this.articlesService.update(
        id,
        updateArticleDto,
      );
      if (!updatedArticle) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: `Article having id: ${id} doesn't exist.`,
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      return updatedArticle;
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      const article = await this.articlesService.remove(id);
      if (!article) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: `Article having id: ${id} doesn't exist.`,
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      return article;
    } catch (error) {
      throw error;
    }
  }
}
