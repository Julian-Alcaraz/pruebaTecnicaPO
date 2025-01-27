import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';
import { deleteUser, loadedUsers } from 'src/app/store/actions/users.actions';
import { selectListUser, selectLoadingUser } from 'src/app/store/selectors/users.selector';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users$: Observable<ReadonlyArray<User>> = new Observable();
  loading$: Observable<boolean> = new Observable();
  @Output() editUser: EventEmitter<any> = new EventEmitter();
  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.users$ = this.store.select(selectListUser);
    this.loading$ = this.store.select(selectLoadingUser);
  }

  eliminar(userId: number) {
    this.store.dispatch(deleteUser({ userId }));
  }
  editar(user: User) {
    this.editUser.emit(user);
  }
}
