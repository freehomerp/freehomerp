export default class Session {
  private constructor(public readonly id: string) {}

  public static create() {
    return new Session(crypto.randomUUID());
  }
}
