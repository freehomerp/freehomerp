import bcrypt from 'bcryptjs';

import { Entity, EntityId } from '$lib/core/domain';

type UserProps = {
  username: string;
  password: string;
};

export default class User extends Entity {
  private constructor(
    public readonly username: string,
    private readonly password: string,
    id?: EntityId,
  ) {
    super(id);
  }

  public async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  public static create({ username, password }: UserProps) {
    return new User(username, password);
  }

  public static from({ id, username, password }: UserProps & { id: string }) {
    return new User(username, password, new EntityId(id));
  }
}
