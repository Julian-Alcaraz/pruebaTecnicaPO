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
export const selectLoadingUserAdd = createSelector(
  //
  selectUsersFeature,
  (state: UsersState) => state.loadingAdd,
);
export const selectLoadingUserUpdate = createSelector(
  //
  selectUsersFeature,
  (state: UsersState) => state.loadingUpdate,
);
export const selectLoadingUserDelete = createSelector(
  //
  selectUsersFeature,
  (state: UsersState) => state.loadingDelete,
);
// for paginator
export const selectCurrentPage = createSelector(selectUsersFeature, (state: UsersState) => state.currentPage);
export const selectPageSize = createSelector(selectUsersFeature, (state: UsersState) => state.pageSize);

export const selectTotalItems = createSelector(selectUsersFeature, (state: UsersState) => state.totalItems);
export const selectTotalPage = createSelector(selectUsersFeature, (state: UsersState) => state.totalPages);
// paginated users
export const selectPaginatedUsers = createSelector(selectListUser, selectCurrentPage, selectPageSize, (users, currentPage, pageSize) => {
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return users.slice(startIndex, endIndex);
});
