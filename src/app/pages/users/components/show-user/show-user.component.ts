import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';
import { deleteUser } from 'src/app/store/actions/users.actions';
import { selectLoadingUserDelete } from 'src/app/store/selectors/users.selector';
import { AppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.css'],
})
export class ShowUserComponent implements OnInit {
  @Input() user!: User;
  @Input() index: number | null = null;
  @Output() editUser: EventEmitter<User> = new EventEmitter();
  public loadingDelete$: Observable<boolean> = new Observable();
  deleting: boolean = false;
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.loadingDelete$ = this.store.select(selectLoadingUserDelete);
  }
  delete(userId: number) {
    this.deleting = true;
    this.store.dispatch(deleteUser({ userId }));
  }

  edit(user: User) {
    this.editUser.emit(user);
  }
}
