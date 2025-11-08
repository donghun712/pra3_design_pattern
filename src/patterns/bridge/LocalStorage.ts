import type { User } from '../../models/User';
import type { Storage } from './Storage';

export class LocalStorage implements Storage {
  private key = 'users';

  save(user: User): void {
    const users = this.getAll();
    users.push(user);
    localStorage.setItem(this.key, JSON.stringify(users));
  }

  getAll(): User[] {
    const data = localStorage.getItem(this.key);
    return data ? JSON.parse(data) : [];
  }

  clear(): void {
    localStorage.removeItem(this.key);
  }
}
