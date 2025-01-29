import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';
import { deleteUser, nextPage, previusPage, filterUsers } from 'src/app/store/actions/users.actions';
import { selectCurrentPage, selectLoadingUser, selectPaginatedUsers, selectCantPagFilterUsers } from 'src/app/store/selectors/users.selector';
import { CONSTANTS } from 'src/app/config/constants';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  @Output() editUser: EventEmitter<any> = new EventEmitter();

  users$: Observable<ReadonlyArray<User>> = new Observable();
  loading$: Observable<boolean> = new Observable();
  currentPage$: Observable<number> = new Observable();
  totalPages$: Observable<number> = new Observable();

  roles: string[] = [];

  constructor(private store: Store<any>) {
    this.roles = CONSTANTS.ROLES;
  }

  ngOnInit() {
    // this.users$ = this.store.select(selectListUser); // toda la lista
    this.users$ = this.store.select(selectPaginatedUsers); // la lista paginada
    this.loading$ = this.store.select(selectLoadingUser);
    this.currentPage$ = this.store.select(selectCurrentPage);
    this.totalPages$ = this.store.select(selectCantPagFilterUsers);
  }

  next(currentPage: number, totalPages: number) {
    if (currentPage < totalPages) {
      this.store.dispatch(nextPage({ nextPage: currentPage + 1 }));
    }
  }

  before(currentPage: number) {
    if (currentPage > 1) {
      this.store.dispatch(previusPage({ previusPage: currentPage - 1 }));
    }
    // this.currentPage$
    //   .subscribe((currentPage) => {
    //     if (currentPage > 1) {
    //       this.store.dispatch(previusPage({ previusPage: currentPage - 1 }));
    //     }
    //   })
    //   .unsubscribe();
  }
  filterList() {
    const nameFilter = 'ra';
    const rolFilter = '';
    this.store.dispatch(filterUsers({ nameFilter, rolFilter }));
  }
  clean() {
    const nameFilter = '';
    const rolFilter = '';
    this.store.dispatch(filterUsers({ nameFilter, rolFilter }));
  }
  eliminar(userId: number) {
    this.store.dispatch(deleteUser({ userId }));
  }

  editar(user: User) {
    this.editUser.emit(user);
  }
}
