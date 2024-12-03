// import { Injectable, Inject } from '@nestjs/common';
// import { Pool, PoolClient } from 'pg';

// const pool = new Pool({
//   log: (...messages) => {
//     console.log('******* pool logs ********\n', messages);
//   },
// });

// pool.on('connect', async (client) => {
//   const res = await client.query('select now()');
//   console.log('******* Database connection successfull *******\n', res.rows);
// });

// // export const query = async (text, params) => {
// //   const start = Date.now();
// //   const res = await pool.query(text, params);
// //   const duration = Date.now() - start;
// //   console.log('executed query', { text, duration, rows: res.rowCount });
// //   return res;
// // };

// // export const getClient = () => {
// //   return pool.connect();
// // };

// export const createTables = async () => {
//   const client = await pool.connect();
//   const articlesTable = `
//     CREATE TABLE IF NOT EXISTS articles (
//       id SERIAL PRIMARY KEY,
//       title VARCHAR(255) NOT NULL,
//       body TEXT NOT NULL,
//       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//     )
//   `;
//   try {
//     await client.query('BEGIN');
//     const res = await client.query(articlesTable);
//     console.log('check the table creation', res.command);
//     await client.query('commit');
//   } catch (error) {
//     await client.query('rollback');
//   } finally {
//     client.release();
//   }
// };

// export interface IRepository {
//   getClient(): Promise<PoolClient>;
//   query<R>(text: string, params?: any[]): Promise<R[]>;
// }

// @Injectable()
// export class Repository<Entity> implements IRepository {
//   constructor(@Inject(Pool) private pool: Pool) {}
//   getClient(): Promise<PoolClient> {
//     return pool.connect();
//   }
//   async query<R = Entity>(text: string, params?: any[]): Promise<R[]> {
//     const start = Date.now();
//     const res = await pool.query<R>(text, params);
//     const duration = Date.now() - start;
//     console.log('executed query', { text, duration, rows: res.rowCount });
//     return res.rows;
//   }
// }

// Generic interface with type parameters T and U
// interface Repository<T, U> {
//   items: T[]; // Array of items of type T
//   add(item: T): void; // Function to add an item of type T
//   getById(id: U): T | undefined; // Function to get an item by ID of type U
// }

// // Implementing the Repository interface for a User entity
// interface User {
//   id: number;
//   name: string;
// }

// class UserRepository implements Repository<User, number> {
//   items: User[] = [];

//   add(item: User): void {
//     this.items.push(item);
//   }

//   getById(idOrName: number | string): User | undefined {
//     if (typeof idOrName === 'string') {
//       // Search by name if idOrName is a string
//       console.log('Searching by name:', idOrName);
//       return this.items.find((user) => user.name === idOrName);
//     } else if (typeof idOrName === 'number') {
//       // Search by id if idOrName is a number
//       console.log('Searching by id:', idOrName);
//       return this.items.find((user) => user.id === idOrName);
//     }
//     return undefined; // Return undefined if no match found
//   }
// }

// // Usage
// const userRepo = new UserRepository();
// userRepo.add({ id: 1, name: 'Alice' });
// userRepo.add({ id: 2, name: 'Bob' });

// const user1 = userRepo.getById(1);
// const user2 = userRepo.getById('Bob');
// console.log(user1); // Output: { id: 1, name: "Alice" }
