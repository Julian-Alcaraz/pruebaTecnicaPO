import { createReducer, on } from '@ngrx/store';
import { loadUsers } from '../actions/users.actions';
import { UsersState } from '../state/user.state';

export const initialState: UsersState = { loading: false, users: [] };

export const usersReducer = createReducer(
  initialState,
  on(loadUsers, (state) => {
    return { ...state };
  }),
  //   on(loadUsers, (state) => {
  //     return state;
  //   }),
  //   on(loadUsers, (state) => {
  //     return state;
  //   }),
);
