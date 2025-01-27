import { User } from 'src/app/interfaces/user.interface';

export interface UsersState {
  loading: boolean;
  // users: ReadonlyArray<User>;
  error: any
  users: Array<User>;
}
