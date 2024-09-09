import { asClass, asValue, createContainer, Lifetime } from 'awilix';
import knex from 'knex';

import config from './config';
import SessionRepositoryImpl from './context/users/infra/session.repository';
import UserRepositoryImpl from './context/users/infra/user.repository';
import SignInWithCredentialsUseCaseImpl from './context/users/usecases/signin.usecase';

export const di = createContainer();

di.register({
  signInWithCredentialsUseCase: asClass(SignInWithCredentialsUseCaseImpl, { lifetime: Lifetime.SINGLETON }),

  sessionRepository: asClass(SessionRepositoryImpl, { lifetime: Lifetime.SINGLETON }),
  userRepository: asClass(UserRepositoryImpl, { lifetime: Lifetime.SINGLETON }),
});

if (config.database.type === 'sqlite3') {
  const db = knex({
    client: 'better-sqlite3',
    connection: {
      filename: config.database.filename,
    },
  });
  di.register({ db: asValue(db) });
}
