export class User {
  id: string;
  email: string;
  password: string;
  role: Role;
}

type Role = 'admin' | 'user' | 'guest';
