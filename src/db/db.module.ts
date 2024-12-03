import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { Repository } from './db.service';
import { Pool } from 'pg';
import { DBMOUDLE_POOL_CONNECTION } from './db.constants';

const poolProvider: Provider = {
  provide: DBMOUDLE_POOL_CONNECTION,
  useFactory: async () => {
    const pool = new Pool({
      log: (...messages) => {
        console.log('******* pool logs ********\n', messages);
      },
    });

    pool.on('connect', async (client) => {
      await client.query('select now()');
    });

    pool.on('error', (err) => {
      console.log('check err', err);
    });

    const client = await pool.connect();

    const articlesTable = `
                CREATE TABLE IF NOT EXISTS articles (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                content TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
              `;

    try {
      await client.query('BEGIN');
      const res = await client.query(articlesTable);
      console.log('check the table creation', res.command);
      await client.query('commit');
    } catch (error) {
      await client.query('rollback');
    } finally {
      client.release();
    }
    return pool;
  },
};

@Global()
@Module({
  providers: [poolProvider, Repository],
  exports: [Repository],
})
export class DbModule {}
