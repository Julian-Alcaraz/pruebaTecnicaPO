import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { nextPage, previusPage } from 'src/app/store/actions/users.actions';
import { selectCantPagFilterUsers, selectCurrentPage } from 'src/app/store/selectors/users.selector';
import { AppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css'],
})
export class PaginatorComponent implements OnInit, OnDestroy {
  currentPage$: Observable<number> = new Observable();
  totalPages$: Observable<number> = new Observable();
  private destroy$ = new Subject<void>();

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.currentPage$ = this.store.select(selectCurrentPage).pipe(takeUntil(this.destroy$));
    this.totalPages$ = this.store.select(selectCantPagFilterUsers).pipe(takeUntil(this.destroy$));
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
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
