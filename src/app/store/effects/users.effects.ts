import { Injectable } from '@angular/core';
import { EMPTY, of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { UsersService } from '../../services/users.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as UserActions from '../actions/users.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationComponent } from 'src/app/components/notification/notification.component';

@Injectable()
export class UsersEffects {
  constructor(private actions$: Actions, private _usersService: UsersService, private snackBar: MatSnackBar) {}

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

  // en caso que sean succes
  addedUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.addedUser),
        map((action) => {
          this.showSnackBar('User added successfully', 'success');
        }),
      ),
    { dispatch: false },
  );

  deletedUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.deletedUser),
        map((action) => {
          this.showSnackBar('User deleted successfully', 'success');
        }),
      ),
    { dispatch: false },
  );

  updateUserSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.updateUserSuccess),
        map(() => {
          this.showSnackBar('User updated successfully', 'success');
        }),
      ),
    { dispatch: false },
  );

  // en caso que sean failure
  addUserFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.addUserFailure),
        map((action) => {
          this.showSnackBar('User add fail: ' + action.error.message, 'error');
        }),
      ),
    { dispatch: false },
  );

  deleteUserFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.deleteUserFailure),
        map((action) => {
          console.log(action);
          this.showSnackBar('User deleted fail: ' + action.error.message, 'error');
        }),
      ),
    { dispatch: false },
  );

  updateUserFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.updateUserFailure),
        map((action) => {
          this.showSnackBar('User updated fail: ' + action.error.message, 'error');
        }),
      ),
    { dispatch: false },
  );

  loadUserFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.loadedUsersFailure),
        map((action) => {
          this.showSnackBar('User load fail: ' + action.error.message, 'error');
        }),
      ),
    { dispatch: false },
  );

  showSnackBar(msj: string, type: string) {
    this.snackBar.openFromComponent(NotificationComponent, {
      data: [msj],
      duration: 3000,
      panelClass: ['custom-snackbar-container', type],
    });
  }
}
