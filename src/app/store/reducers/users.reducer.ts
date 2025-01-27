import { createReducer, on } from '@ngrx/store';
import { UsersState } from '../state/user.state';
import * as UserActions from '../actions/users.actions';
export const initialState: UsersState = {
  loading: false,
  users: [],
  error: null,
  errorAdd: null,
  errorUpdate: null,
  errorDelete: null,
  loadingAdd: false,
  loadingDelete: false,
  loadingUpdate: false,
  currentPage: 1,
  pageSize: 10,
  totalPages: 1,
  totalItems: 0,
};

export const usersReducer = createReducer(
  initialState,
  // List
  on(UserActions.loadUsers, (state) => {
    return { ...state, loading: true };
  }),
  on(UserActions.loadedUsers, (state, { /* props que se mandan */ users }) => {
    return { ...state, loading: false, users, totalItems: users.length, totalPages: Math.ceil(users.length / state.pageSize) };
  }),
  // Add
  on(UserActions.addUser, (state, { user }) => {
    return { ...state, loadingAdd: true };
  }),
  on(UserActions.addedUser, (state, { user }) => {
    const newList = [...state.users, user];
    return { ...state, users: newList, loadingAdd: false, totalItems: newList.length, totalPages: Math.ceil(newList.length / state.pageSize) };
  }),
  // Delete
  on(UserActions.deleteUser, (state, { userId }) => {
    return { ...state, loadingDelete: true };
  }),
  on(UserActions.deletedUser, (state, { userId }) => {
    const newList = state.users.filter((elem) => elem.id != userId);
    return { ...state, users: newList, loadingDelete: false, totalItems: newList.length, totalPages: Math.ceil(newList.length / state.pageSize) };
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
    error,
  })),
  on(UserActions.addUserFailure, (state, { error }) => ({
    ...state,
    loadingAdd: false,
    errorAdd: error,
  })),
  on(UserActions.deleteUserFailure, (state, { error }) => ({
    ...state,
    loadingDelete: false,
    errorDelete: error,
  })),
  on(UserActions.updateUserFailure, (state, { error }) => ({
    ...state,
    loadingUpdate: false,
    errorUpdate: error,
  })),
);
