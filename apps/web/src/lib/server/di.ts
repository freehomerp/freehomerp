import { asClass, asValue, createContainer, Lifetime } from 'awilix';
import knex from 'knex';

import config from './config';
import UsersService from './context/application/users.service';
import { SessionInMemoryRepository } from './context/infra/repositories/session.repository';

export const di = createContainer();

di.register({
  usersService: asClass(UsersService, { lifetime: Lifetime.SINGLETON }),

  sessionRepository: asClass(SessionInMemoryRepository, { lifetime: Lifetime.SINGLETON }),
});

{
  // Database definition
  if (config.database.type === 'sqlite3') {
    const db = knex({
      client: 'better-sqlite3',
      connection: {
        filename: config.database.filename,
      }
    });
    di.register({ db: asValue(db) });
  }
  // const dbContext = knex({
  //     client: 'pg',
  //     connection: {
  //         host: CONFIG.DB.HOST,
  //         port: CONFIG.DB.PORT,
  //         user: CONFIG.DB.USER,
  //         password: CONFIG.DB.PASS,
  //         database: CONFIG.DB.NAME,
  //     },
  // });
  // di.register({ dbContext: asValue(dbContext) });
}
