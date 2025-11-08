import type { User } from '../../models/User';
import type { UserState } from './UserState';

export class InactiveState implements UserState {
  activate(user: User): void {
    console.log('활성화합니다');
    user.status = 'active';
  }

  deactivate(user: User): void {
    console.log('이미 비활성 상태입니다');
  }

  getStatus(): string {
    return '비활성';
  }
}
