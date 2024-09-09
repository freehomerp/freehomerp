import { Entity, EntityId } from '$lib/core/domain';
import config from '$lib/server/config';

type SessionProps = {
  created: Date;
  expires: Date;
};

export default class Session extends Entity {
  private constructor(
    public readonly created: Date = new Date(),
    public readonly expires: Date = new Date(Date.now() + config.session.maxAge * 1000),
    id?: EntityId,
  ) {
    super(id);
  }

  public static create() {
    return new Session();
  }

  public static from({ id, created, expires }: SessionProps & { id: string }) {
    return new Session(created, expires, new EntityId(id));
  }
}
