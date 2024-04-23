import { User } from 'src/users/entities/user';

export interface Task {
  id: string;
  title: string;
  owner: Omit<User, 'tasks'>;
  isDone: boolean;
}
