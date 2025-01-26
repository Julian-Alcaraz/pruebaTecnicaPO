import { ActionReducerMap } from '@ngrx/store';
import { UsersState } from './user.state';
import { usersReducer } from '../reducers/users.reducer';

export interface AppState {
  users: UsersState;
}

export const ROOT_REDUCER: ActionReducerMap<AppState> = {
  users: usersReducer,
};
