import type { User } from '../../models/User';

export interface UserState {
  activate(user: User): void;
  deactivate(user: User): void;
  getStatus(): string;
}
