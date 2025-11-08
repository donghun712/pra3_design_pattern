import type { User } from '../../models/User';

export class UserBuilder {
  private user: Partial<User> = {
    status: 'active'
  };

  setId(id: number): this {
    this.user.id = id;
    return this;
  }

  setName(name: string): this {
    this.user.name = name;
    return this;
  }

  setEmail(email: string): this {
    this.user.email = email;
    return this;
  }

  setStatus(status: 'active' | 'inactive'): this {
    this.user.status = status;
    return this;
  }

  build(): User {
    if (!this.user.id || !this.user.name || !this.user.email) {
      throw new Error('필수 필드가 누락되었습니다');
    }
    return this.user as User;
  }
}
