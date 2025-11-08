import type { User } from '../../models/User';

export interface Storage {
  save(user: User): void;
  getAll(): User[];
  clear(): void;
}
