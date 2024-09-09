import Session from '$lib/context/users/domain/session.aggregate';
import type SessionRepository from '$lib/context/users/domain/session.repository';
import type UserRepository from '$lib/context/users/domain/user.repository';
import type {
  SignInWithCredentialsParams,
  SignInWithCredentialsResult,
  SignInWithCredentialsUseCase,
} from '$lib/context/users/usecases/signin.usecase';
import { UseCaseError } from '$lib/core/error';
import { type Result, ResultEmpty, ResultError, ResultOK } from '$lib/core/result';

const InvalidCredentialsError = new UseCaseError('Invalid credentials.');

export default class SignInWithCredentialsUseCaseImpl implements SignInWithCredentialsUseCase {
  private _sessionRepository: SessionRepository;
  private _userRepository: UserRepository;

  public constructor({
    sessionRepository,
    userRepository,
  }: {
    sessionRepository: SessionRepository;
    userRepository: UserRepository;
  }) {
    this._sessionRepository = sessionRepository;
    this._userRepository = userRepository;
  }

  public async execute({
    username,
    password,
  }: SignInWithCredentialsParams): Promise<Result<SignInWithCredentialsResult>> {
    const userResult = await this._userRepository.findBy({ username });
    if (!userResult.success) {
      return userResult;
    }

    const user = userResult.data;
    if (user == null || !(await user.validatePassword(password))) {
      return ResultError(InvalidCredentialsError);
    }

    const session = Session.create();
    const sessionResult = await this._sessionRepository.create(session);
    if (!sessionResult.success) {
      return sessionResult;
    }

    return ResultOK({ session });
  }
}
