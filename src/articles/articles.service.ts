import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticlesService {
  private articles = [];

  findAll() {
    return this.articles;
  }

  findOne(id: number) {
    return this.articles.find((article) => article.id === id);
  }

  create(article: CreateArticleDto) {
    let id = this.articles.length
      ? this.articles[this.articles.length - 1].id + 1
      : 1;
    this.articles.push({ id, ...article });
    return { id, ...article };
  }

  update(id: number, article: UpdateArticleDto) {
    const index = this.articles.findIndex((article) => article.id === id);
    if (index !== -1) {
      this.articles[index] = { ...this.articles[index], ...article };
      return this.articles[index];
    }
    throw new NotFoundException(`article with id ${id} does not exist`);
  }

  remove(id: number) {
    const index = this.articles.findIndex((article) => article.id === id);
    if (index !== -1) this.articles.splice(index, 1);
  }
}
