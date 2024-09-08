import type Session from '$lib/context/domain/users/session/session.aggregate';
import type SessionRepository from '$lib/context/domain/users/session/session.repository';

export class SessionInMemoryRepository implements SessionRepository {
  private _cache: Map<string, Session> = new Map<string, Session>();

  public async save(session: Session): Promise<void> {
    this._cache.set(session.id, session);
  }
}
