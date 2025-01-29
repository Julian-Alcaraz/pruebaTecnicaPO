import { User } from 'src/app/interfaces/user.interface';

export interface UsersState {
  users: ReadonlyArray<User>;
  // estado de carga
  loading: boolean;
  loadingAdd: boolean;
  loadingUpdate: boolean;
  loadingDelete: boolean;
  // para paginador
  currentPage: number;
  totalItems: number;
  pageSize: number;
  // filtros
  filterNameOrLast: string;
  filterRol: string;
}
