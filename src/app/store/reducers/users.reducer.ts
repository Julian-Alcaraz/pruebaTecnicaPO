import { createReducer, on } from '@ngrx/store';
import { UsersState } from '../state/user.state';
import * as UserActions from '../actions/users.actions';
export const initialState: UsersState = { loading: false, users: [], error: null };

export const usersReducer = createReducer(
  initialState,
  // List
  on(UserActions.loadUsers, (state) => {
    return { ...state, loading: true };
  }),
  on(UserActions.loadedUsers, (state, { /* props que se mandan */ users }) => {
    return { ...state, loading: false, users };
  }),
  // Add
  on(UserActions.addUser, (state, { user }) => {
    return { ...state };
  }),
  on(UserActions.addedUser, (state, { user }) => {
    return { ...state, users: [...state.users, user], loading: false };
  }),
  // Delete
  on(UserActions.deleteUser, (state, { userId }) => {
    return { ...state };
  }),
  on(UserActions.deletedUser, (state, { userId }) => {
    return { ...state, users: state.users.filter((elem) => elem.id != userId), loading: false };
  }),
  // Update
  on(UserActions.updateUser, (state, { user }) => {
    return { ...state };
  }),
  on(UserActions.updateUserSuccess, (state, { user }) => {
    const updatedUsers = state.users.map((elem) => (elem.id === user.id ? { ...elem, ...user } : elem));
    return { ...state, users: updatedUsers, loading: false };
  }),
  // error
  on(UserActions.addUserFailure, UserActions.loadedUsersFailure, UserActions.deleteUserFailure, UserActions.updateUserFailure, (state, { error }) => ({
    // agregar las otras
    ...state,
    error: error,
    loading: false,
  })),
);
