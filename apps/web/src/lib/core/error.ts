export interface BaseError {
  get message(): string;
}

export class UseCaseError implements BaseError {
  public constructor(public readonly message: string) {}
}
