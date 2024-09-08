import type User from "./user.aggregate";

export type FindByCriteria = { username: string };

export default interface UserRepository {
  findBy(criteria: FindByCriteria): Promise<User | null>;
}
