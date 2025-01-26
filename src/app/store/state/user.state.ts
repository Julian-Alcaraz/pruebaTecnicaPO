import { User } from 'src/app/models/user.model';

export interface UsersState {
  loading: boolean;
  users: ReadonlyArray<User>;
}
