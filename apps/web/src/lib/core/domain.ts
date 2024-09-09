export class EntityId {
  public constructor(public readonly value: string = crypto.randomUUID()) {}
}

export abstract class Entity {
  protected constructor(public readonly id: EntityId = new EntityId()) {}
}
