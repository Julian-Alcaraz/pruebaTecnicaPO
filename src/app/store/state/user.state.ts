import { User } from 'src/app/interfaces/user.interface';

export interface UsersState {
  loading: boolean;
  users: ReadonlyArray<User>;
  error: any;
  loadingAdd: boolean;
  loadingUpdate: boolean;
  loadingDelete: boolean;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  // users: Array<User>;
}
