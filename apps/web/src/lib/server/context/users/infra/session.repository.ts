import type { Knex } from 'knex';

import type Session from '$lib/context/users/domain/session.aggregate';
import type SessionRepository from '$lib/context/users/domain/session.repository';
import { type Result, ResultEmpty } from '$lib/core/result';

type SessionTable = {
  id: string;
  created: Date;
  expires: Date;
};

function aggregateToMap({ id: { value: id }, created, expires }: Session): SessionTable {
  return { id, created, expires };
}

export default class SessionRepositoryImpl implements SessionRepository {
  private _db: Knex;

  public constructor({ db }: { db: Knex }) {
    this._db = db;
  }

  public async create(session: Session): Promise<Result<void>> {
    this._query().insert(aggregateToMap(session));
    return ResultEmpty();
  }

  private _query(): Knex.QueryBuilder {
    return this._db<SessionTable>('sessions');
  }
}
