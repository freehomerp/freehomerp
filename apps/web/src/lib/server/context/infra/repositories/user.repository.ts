import type { Knex } from "knex";

import User from "$lib/context/domain/users/user/user.aggregate";
import type { FindByCriteria } from "$lib/context/domain/users/user/user.repository";
import type UserRepository from "$lib/context/domain/users/user/user.repository";

type UserTable = {
  id: string;
  username: string;
  // password: string;
};

function mapToAggregate(table: UserTable): User {
  return new User(table.id, table.username);
}

export default class UserRepositoryAdapter implements UserRepository {
  private _db: Knex;

  public constructor({ db }: { db: Knex }) {
      this._db = db;
  }

  public async findBy(criteria: FindByCriteria): Promise<User | null> {
    let query = this._builder();
    if (criteria.username != null) {
      query = query.where('username', criteria.username);
    }
    const result = await query.select('*').first();
    return mapToAggregate(result);
  }

  private _builder(): Knex.QueryBuilder {
    return this._db<UserTable>('users');
  }
}
