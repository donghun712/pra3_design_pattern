import type { User } from '../../models/User';
import type { UserState } from './UserState';
import { ActiveState } from './ActiveState';
import { InactiveState } from './InactiveState';

export class UserContext {
  private state: UserState;
  private user: User;

  constructor(user: User) {
    this.user = user;
    this.state = user.status === 'active' ? new ActiveState() : new InactiveState();
  }

  activate(): void {
    this.state.activate(this.user);
    this.state = new ActiveState();
  }

  deactivate(): void {
    this.state.deactivate(this.user);
    this.state = new InactiveState();
  }

  getStatus(): string {
    return this.state.getStatus();
  }

  getUser(): User {
    return this.user;
  }
}
