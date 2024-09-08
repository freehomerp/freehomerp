export default class User {
  public constructor(
    public readonly id: string,
    public readonly username: string,
  ) {}

  public static create(username: string) {
    return new User(crypto.randomUUID(), username);
  }
}
