import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/interfaces/user.interface';

export const loadUsers = createAction(
  '[User list] Load user',
);
export const loadedUsers = createAction(
    '[User list] Loaded user success',
    props<{ users: User[] }>()
  );

