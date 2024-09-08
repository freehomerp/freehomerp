import Session from '$lib/context/domain/users/session/session.aggregate';
import type SessionRepository from '$lib/context/domain/users/session/session.repository';
import type { Result } from '$lib/utils/result';

export type SignInWithCredentialsParams = {
  username: string;
  password: string;
};

export type SignInWithCredentialsResult = Result<{ session: Session }>;

export interface UsersService {
  signinWithCredentials(params: SignInWithCredentialsParams): Promise<SignInWithCredentialsResult>;
}

export default class UsersServiceImpl implements UsersService {
  private _sessionRepository: SessionRepository;

  public constructor({ sessionRepository }: { sessionRepository: SessionRepository }) {
    this._sessionRepository = sessionRepository;
  }

  public async signinWithCredentials(params: SignInWithCredentialsParams): Promise<SignInWithCredentialsResult> {
    if (params.username !== 'admin') {
      return { success: false };
    }

    const session = Session.create();
    this._sessionRepository.save(session);
    return { success: true, data: { session } };
  }
}
