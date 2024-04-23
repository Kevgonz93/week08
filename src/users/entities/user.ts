import { Task } from 'src/tasks/entitites/task';

type Role = 'admin' | 'user' | 'guest';

export class User {
  id: string;
  email: string;
  password?: string;
  role: Role;
  tasks: Array<Omit<Task, 'owner'>>;
}
