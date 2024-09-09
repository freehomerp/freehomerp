import { type Result } from './result';

export interface UseCase<TParams, TResult> {
  execute(params?: TParams): Promise<Result<TResult>>;
}
