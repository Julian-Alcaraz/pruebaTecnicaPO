import { Injectable } from '@angular/core';
import { EMPTY, of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { UsersService } from '../../services/users.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as UserActions from '../actions/users.actions';

@Injectable()
export class UsersEffects {
  constructor(private actions$: Actions, private _usersService: UsersService) {}

  loadUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.loadUsers),
      exhaustMap(() =>
        this._usersService.getUsers().pipe(
          map((users) => UserActions.loadedUsers({ users })),
          catchError((error) => of(UserActions.loadedUsersFailure({ error }))),
        ),
      ),
    );
  });
  addUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.addUser),
      exhaustMap(({ user }) =>
        this._usersService.addUser(user).pipe(
          map((user) => UserActions.addedUser({ user })),
          catchError((error) => of(UserActions.addUserFailure({ error }))),
        ),
      ),
    );
  });

  deleteUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.deleteUser),
      exhaustMap(({ userId }) =>
        this._usersService.deleteUser(userId).pipe(
          map((userId) => UserActions.deletedUser({ userId })),
          catchError((error) => of(UserActions.deleteUserFailure({ error }))),
        ),
      ),
    );
  });
  
  updateUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.updateUser),
      exhaustMap(({ user }) =>
        this._usersService.updateUser(user).pipe(
          map((user) => UserActions.updateUserSuccess({ user })),
          catchError((error) => of(UserActions.updateUserFailure({ error }))),
        ),
      ),
    );
  });
}
