import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/interfaces/user.interface';

export const loadUsers = createAction('[User] Load User');
export const loadedUsers = createAction('[User] Loaded User', props<{ users: User[] }>());
export const loadedUsersFailure = createAction('[User] Loaded User Failure', props<{ error: any }>());

export const addUser = createAction('[User] Add User', props<{ user: User }>());
export const addedUser = createAction('[User] Added User', props<{ user: User }>());
export const addUserFailure = createAction('[User] Create User Failure', props<{ error: any }>());

export const updateUser = createAction('[User] Update User', props<{ user: User }>());

export const updateUserSuccess = createAction('[User] Update User Success', props<{ user: User }>());

export const updateUserFailure = createAction('[User] Update User Failure', props<{ error: any }>());

// // Eliminar usuario
export const deleteUser = createAction('[User] Delete User', props<{ userId: number }>());

export const deletedUser = createAction('[User] Deleted User', props<{ userId: number }>());

export const deleteUserFailure = createAction('[User] Delete User Failure', props<{ error: any }>());
