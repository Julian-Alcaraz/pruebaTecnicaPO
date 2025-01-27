import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';
import { deleteUser, loadedUsers, loadUsers, nextPage, previusPage } from 'src/app/store/actions/users.actions';
import { selectCurrentPage, selectListUser, selectLoadingUser, selectPaginatedUsers, selectTotalPage } from 'src/app/store/selectors/users.selector';
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
  currentPage$: Observable<number> = new Observable();
  totalPages$: Observable<number> = new Observable();
  constructor(private store: Store<any>) {}

  ngOnInit() {
    // this.users$ = this.store.select(selectListUser);
    this.users$ = this.store.select(selectPaginatedUsers);
    this.loading$ = this.store.select(selectLoadingUser);
    this.currentPage$ = this.store.select(selectCurrentPage);
    this.totalPages$ = this.store.select(selectTotalPage);
  }
  next() {
    console.log('ejecuto next');
    this.currentPage$
      .subscribe((currentPage) => {
        this.totalPages$
          .subscribe((totalPages) => {
            if (currentPage < totalPages) {
              this.store.dispatch(nextPage({ nextPage: currentPage + 1 }));
            }
          })
          .unsubscribe();
      })
      .unsubscribe();
  }

  before() {
    this.currentPage$
      .subscribe((currentPage) => {
        if (currentPage > 1) {
          this.store.dispatch(previusPage({ previusPage: currentPage - 1 }));
        }
      })
      .unsubscribe();
  }

  eliminar(userId: number) {
    this.store.dispatch(deleteUser({ userId }));
  }
  editar(user: User) {
    this.editUser.emit(user);
  }
}
