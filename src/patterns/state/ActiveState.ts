import type { User } from '../../models/User';
import type { UserState } from './UserState';
import { InactiveState } from './InactiveState';

export class ActiveState implements UserState {
  activate(user: User): void {
    console.log('이미 활성 상태입니다');
  }

  deactivate(user: User): void {
    console.log('비활성화합니다');
    user.status = 'inactive';
  }

  getStatus(): string {
    return '활성';
  }
}
