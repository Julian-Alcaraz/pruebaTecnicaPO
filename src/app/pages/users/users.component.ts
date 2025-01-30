import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from 'src/app/interfaces/user.interface';
import { loadUsers } from 'src/app/store/actions/users.actions';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  user: User | null = null;
  showForm: boolean = false;

  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.store.dispatch(loadUsers()); // ejecuto la action loadUsers
  }
  editUser(event: User) {
    this.user = event;
  }
  cancelEdit() {
    this.user = null;
  }
  showNewUser() {
    this.showForm = !this.showForm;
  }
}
