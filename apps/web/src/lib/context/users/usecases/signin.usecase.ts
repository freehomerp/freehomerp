import { type UseCase } from '../../../core/usecase';
import type Session from '../domain/session.aggregate';

export type SignInWithCredentialsParams = {
  username: string;
  password: string;
};

export type SignInWithCredentialsResult = {
  session: Session;
};

export type SignInWithCredentialsUseCase = UseCase<SignInWithCredentialsParams, SignInWithCredentialsResult>;
