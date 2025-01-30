import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';
import { selectLoadingUser, selectPaginatedUsers } from 'src/app/store/selectors/users.selector';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit, OnDestroy {
  @Output() editUser: EventEmitter<User> = new EventEmitter();

  users$: Observable<ReadonlyArray<User>> = new Observable();
  loading$: Observable<boolean> = new Observable();
  private destroy$ = new Subject<void>();

  constructor(private store: Store<any>) {}

  ngOnInit() {
    // this.users$ = this.store.select(selectListUser); // toda la lista
    this.users$ = this.store.select(selectPaginatedUsers).pipe(takeUntil(this.destroy$)); // la lista paginada
    this.loading$ = this.store.select(selectLoadingUser).pipe(takeUntil(this.destroy$));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
