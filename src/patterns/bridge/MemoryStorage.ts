import type { User } from '../../models/User';
import type { Storage } from './Storage';

export class MemoryStorage implements Storage {
  private users: User[] = [];

  save(user: User): void {
    this.users.push(user);
  }

  getAll(): User[] {
    return [...this.users];
  }

  clear(): void {
    this.users = [];
  }
}
