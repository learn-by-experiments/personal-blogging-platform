import { Injectable, Inject } from '@nestjs/common';
import { Pool, PoolClient } from 'pg';
import { DBMOUDLE_POOL_CONNECTION } from './db.constants';

@Injectable()
export class Repository<Entity> {
  constructor(@Inject(DBMOUDLE_POOL_CONNECTION) readonly pool: Pool) {}
  getClient(): Promise<PoolClient> {
    return this.pool.connect();
  }
  async query(text: string, params?: any[]): Promise<Entity[]> {
    const start = Date.now();
    const res = await this.pool.query<Entity>(text, params);
    const duration = Date.now() - start;
    console.log('executed query', { text, duration, rows: res.rowCount });
    return res.rows;
  }
}

// export interface Repository<T> {
//   pool: Pool;
//   query(text: string, params?: any[]): Promise<T[]>;
// }

// @Injectable()
// export class UserRepository implements Repository<User> {
//   constructor(@Inject(DBMOUDLE_POOL_CONNECTION) readonly pool: Pool) {}
//   getClient(): Promise<PoolClient> {
//     return this.pool.connect();
//   }
//   async query(text: string, params?: any[]): Promise<User[]> {
//     const start = Date.now();
//     const res = await this.pool.query<User>(text, params);
//     const duration = Date.now() - start;
//     console.log('executed query', { text, duration, rows: res.rowCount });
//     return res.rows;
//   }
// }

// @Injectable()
// export class ArticlesRepository implements Repository<Article> {
//   constructor(@Inject(DBMOUDLE_POOL_CONNECTION) readonly pool: Pool) {}
//   getClient(): Promise<PoolClient> {
//     return this.pool.connect();
//   }
//   async query(text: string, params?: any[]): Promise<Article[]> {
//     const start = Date.now();
//     const res = await this.pool.query<Article>(text, params);
//     const duration = Date.now() - start;
//     console.log('executed query', { text, duration, rows: res.rowCount });
//     return res.rows;
//   }
// }
