import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Repository } from 'src/db/db.service';
import { Article } from './entities/articles.entity';

@Injectable()
export class ArticlesService {
  constructor(private articlesRepository: Repository<Article>) {
    this.articlesRepository.query('Select now()');
  }

  async findAll(): Promise<Article[]> {
    const articles = await this.articlesRepository.query(
      'select * from articles order by id',
    );
    console.log('check the res', articles);
    return articles.map((row) => {
      return {
        content: row.content,
        id: row.id,
        title: row.title,
      };
    });
  }

  async findOne(id: number): Promise<Article> {
    const article = await this.articlesRepository.query(
      'select * from articles where id =  $1',
      [id],
    );
    return article?.length
      ? {
          content: article[0].content,
          id: article[0].id,
          title: article[0].title,
        }
      : null;
  }

  async create(article: CreateArticleDto) {
    const client = await this.articlesRepository.getClient();
    try {
      await client.query('Begin');
      const result = await client.query(
        'insert into articles(title,content) values($1,$2) returning *',
        [article.title, article.content],
      );
      await client.query('commit');
      client.release();
      return result?.rows?.length ? result?.rows[0] : null;
    } catch (error) {
      await client.query('rollback');
      client.release();
      throw error;
    }
  }

  async update(id: number, article: UpdateArticleDto): Promise<Article> {
    const client = await this.articlesRepository.getClient();
    try {
      await client.query('Begin');
      const query =
        `update articles set ` +
        Object.keys(article)
          .map((key, index) => `${key} = $${index + 1}`)
          .join(',') +
        ` where id=${id} returning *`;
      console.log('check query builder', query, Object.values(article));
      const result = await client.query(query, Object.values(article));
      await client.query('commit');
      console.log('chekc result', result.rows);
      client.release();
      return result?.rows?.length ? result?.rows[0] : null;
    } catch (error) {
      await client.query('rollback');
      client.release();
      throw error;
    }
  }

  async remove(id: number) {
    const client = await this.articlesRepository.getClient();

    try {
      await client.query('Begin');
      const result = await client.query(
        `delete from articles where id = $1 returning *`,
        [id],
      );
      await client.query('commit');
      console.log('chekc result', result.rows);
      client.release();
      return result?.rows?.length ? result?.rows[0] : null;
    } catch (error) {}
  }
}
