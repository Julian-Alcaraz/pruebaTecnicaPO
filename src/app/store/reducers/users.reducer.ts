import { createReducer, on } from '@ngrx/store';
import { UsersState } from '../state/user.state';
import * as UserActions from '../actions/users.actions';
export const initialState: UsersState = {
  loading: false,
  users: [],
  loadingAdd: false,
  loadingDelete: false,
  loadingUpdate: false,
  currentPage: 1,
  pageSize: 10,
  totalItems: 0,
  filterNameOrLast: '',
  filterRol: '',
};

export const usersReducer = createReducer(
  initialState,
  // List
  on(UserActions.loadUsers, (state) => {
    return { ...state, loading: true };
  }),
  on(UserActions.loadedUsers, (state, { /* props que se mandan */ users }) => {
    return { ...state, loading: false, users, totalItems: users.length };
  }),
  // Add
  on(UserActions.addUser, (state, { user }) => {
    return { ...state, loadingAdd: true };
  }),
  on(UserActions.addedUser, (state, { user }) => {
    const newList = [...state.users, user];
    return { ...state, users: newList, loadingAdd: false, totalItems: newList.length };
  }),
  // Delete
  on(UserActions.deleteUser, (state, { userId }) => {
    return { ...state, loadingDelete: true };
  }),
  on(UserActions.deletedUser, (state, { userId }) => {
    const newList = state.users.filter((elem) => elem.id != userId);
    return { ...state, users: newList, loadingDelete: false, totalItems: newList.length };
  }),
  // Update
  on(UserActions.updateUser, (state, { user }) => {
    return { ...state, loadingUpdate: true };
  }),
  on(UserActions.updateUserSuccess, (state, { user }) => {
    const updatedUsers = state.users.map((elem) => (elem.id === user.id ? { ...elem, ...user } : elem));
    return { ...state, users: updatedUsers, loadingUpdate: false };
  }),
  // paginator
  on(UserActions.nextPage, (state, { nextPage }) => {
    return { ...state, currentPage: nextPage };
  }),
  on(UserActions.previusPage, (state, { previusPage }) => {
    return { ...state, currentPage: previusPage };
  }),
  // error
  on(UserActions.loadedUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
  })),
  on(UserActions.addUserFailure, (state, { error }) => ({
    ...state,
    loadingAdd: false,
  })),
  on(UserActions.deleteUserFailure, (state, { error }) => ({
    ...state,
    loadingDelete: false,
  })),
  on(UserActions.updateUserFailure, (state, { error }) => ({
    ...state,
    loadingUpdate: false,
  })),

  on(UserActions.filterUsers, (state, { nameFilter, rolFilter }) => {
    return {
      ...state,
      filterNameOrLast: nameFilter,
      filterRol: rolFilter,
      currentPage: 1,
    };
  }),
);
