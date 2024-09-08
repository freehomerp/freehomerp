import type Session from './session.aggregate';

export default interface SessionRepository {
  save(session: Session): Promise<void>;
}
