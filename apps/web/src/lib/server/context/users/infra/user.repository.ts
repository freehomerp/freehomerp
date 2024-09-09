import type { Knex } from 'knex';

import User from '$lib/context/users/domain/user.aggregate';
import type { FindByCriteria } from '$lib/context/users/domain/user.repository';
import type UserRepository from '$lib/context/users/domain/user.repository';
import { type Result, ResultOK } from '$lib/core/result';

type UserTable = {
  id: string;
  username: string;
  password: string;
};

function mapToAggregate({ id, username, password }: UserTable): User {
  return User.from({ id, username, password });
}

export default class UserRepositoryImpl implements UserRepository {
  private _db: Knex;

  public constructor({ db }: { db: Knex }) {
    this._db = db;
  }

  public async findBy(criteria: FindByCriteria): Promise<Result<User | null>> {
    let query = this._query();
    if (criteria.username != null) {
      query = query.where('username', criteria.username);
    }

    const result = await query.select('*').first();
    if (result == null) {
      return ResultOK(null);
    }

    return ResultOK(mapToAggregate(result));
  }

  private _query(): Knex.QueryBuilder {
    return this._db<UserTable>('users');
  }
}
