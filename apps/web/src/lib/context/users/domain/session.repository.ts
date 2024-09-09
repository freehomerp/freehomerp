import type { Result } from '$lib/core/result';

import type Session from './session.aggregate';

export default interface SessionRepository {
  create(session: Session): Promise<Result<void>>;
}
