import { createSelector } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { UsersState } from '../state/user.state';

export const selectUsersFeature = (state: AppState) => state.users;

export const selectListUser = createSelector(
  //
  selectUsersFeature,
  (state: UsersState) => state.users,
);
export const selectLoadingUser = createSelector(
  //
  selectUsersFeature,
  (state: UsersState) => state.loading,
);
