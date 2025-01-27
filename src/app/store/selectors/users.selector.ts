import { createSelector } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { UsersState } from '../state/user.state';

export const selectUsersFeature = (state: AppState) => state.users;
// loadings
export const selectListUser = createSelector(selectUsersFeature, (state: UsersState) => state.users);
export const selectLoadingUser = createSelector(selectUsersFeature, (state: UsersState) => state.loading);
export const selectLoadingUserAdd = createSelector(selectUsersFeature, (state: UsersState) => state.loadingAdd);
export const selectLoadingUserUpdate = createSelector(selectUsersFeature, (state: UsersState) => state.loadingUpdate);
export const selectLoadingUserDelete = createSelector(selectUsersFeature, (state: UsersState) => state.error);
// Crud errors
export const selectLoadError = createSelector(selectUsersFeature, (state: UsersState) => state.error);
export const selectAddError = createSelector(selectUsersFeature, (state: UsersState) => state.errorAdd);
export const selectUpdateError = createSelector(selectUsersFeature, (state: UsersState) => state.errorUpdate);
export const selectDeleteError = createSelector(selectUsersFeature, (state: UsersState) => state.errorDelete);
// success
export const selectLoadSuccess = createSelector(selectUsersFeature, (state: UsersState) => !state.loading && state.error === null);
export const selectAddSuccess = createSelector(selectUsersFeature, (state: UsersState) => !state.loadingAdd && state.errorAdd === null);
export const selectUpdateSuccess = createSelector(selectUsersFeature, (state: UsersState) => !state.loadingUpdate && state.errorUpdate === null);
export const selectDeleteSuccess = createSelector(selectUsersFeature, (state: UsersState) => !state.loadingDelete && state.errorDelete === null);
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
