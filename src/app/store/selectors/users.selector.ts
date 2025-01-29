import { createSelector } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { UsersState } from '../state/user.state';

export const selectUsersFeature = (state: AppState) => state.users;
export const selectListUser = createSelector(selectUsersFeature, (state: UsersState) => state.users);
// loadings
export const selectLoadingUser = createSelector(selectUsersFeature, (state: UsersState) => state.loading);
export const selectLoadingUserAdd = createSelector(selectUsersFeature, (state: UsersState) => state.loadingAdd);
export const selectLoadingUserUpdate = createSelector(selectUsersFeature, (state: UsersState) => state.loadingUpdate);
export const selectLoadingUserDelete = createSelector(selectUsersFeature, (state: UsersState) => state.loadingDelete);

// for paginator
export const selectCurrentPage = createSelector(selectUsersFeature, (state: UsersState) => state.currentPage);
export const selectPageSize = createSelector(selectUsersFeature, (state: UsersState) => state.pageSize);
export const selectTotalItems = createSelector(selectUsersFeature, (state: UsersState) => state.totalItems);

export const selectFilterNam = createSelector(selectUsersFeature, (state: UsersState) => state.filterNameOrLast);
export const selectFilterRol = createSelector(selectUsersFeature, (state: UsersState) => state.filterRol);
// filter users
export const selectFilterUsers = createSelector(selectListUser, selectFilterNam, selectFilterRol, (users, nameFilter, rolFilter) => {
  const nameFilterL = nameFilter.toLowerCase();
  const rolFilterL = rolFilter.toLowerCase();

  const filteredUsers = users.filter((user) => {
    const apellido = user.apellido.toLowerCase();
    const nombre = user.nombre.toLowerCase();
    const matchesName = apellido.toLowerCase().includes(nameFilterL) || nombre.includes(nameFilterL);
    const matchesRol = rolFilterL ? user.rol.toLowerCase() === rolFilterL : true;
    return matchesName && matchesRol;
  });
  return filteredUsers;
});
// paginated users

export const selectPaginatedUsers = createSelector(selectFilterUsers, selectCurrentPage, selectPageSize, (users, currentPage, pageSize) => {
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return users.slice(startIndex, endIndex);
});

export const selectCantPagFilterUsers = createSelector(selectFilterUsers, selectPageSize, (users, pageSize) => {
  const totalPages = Math.ceil(users.length / pageSize);
  return totalPages;
});
