import { NgModule } from '@angular/core';
import { UsersComponent } from './users.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { CommonComponentsModule } from 'src/app/components/common-components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [UsersComponent, UserListComponent, UserFormComponent],
  imports: [CommonComponentsModule, ReactiveFormsModule, CommonModule],
  providers: [],
  exports: [UsersComponent, UserListComponent, UserFormComponent],
})
export class UserModule {}
