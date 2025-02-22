export class User {
  id?: number;
  email: string;
  name: string;
  profile?: {
    id?: number;
    bio: string;
  };

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
