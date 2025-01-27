import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { User } from 'src/app/interfaces/user.interface';
import { addUser, updateUser } from 'src/app/store/actions/users.actions';
// import * as UserActions from 'src/app/store/actions/users.actions';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  @Input() editUser!: User | null;
  userForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    apellido: ['', [Validators.required]],
    email: ['', [Validators.required]],
    rol: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit() {
    if (this.editUser) {
      this.userForm.patchValue(this.editUser);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['editUser'] && this.editUser) {
      this.userForm.patchValue(this.editUser);
    }
  }
  get inputControl(): (input: string) => FormControl {
    return (input: string) => this.userForm.get(input) as FormControl;
  }
  editar() {
    console.log('editar');
    if (!this.userForm.valid) {
      this.userForm.markAllAsTouched();
    } else {
      console.log('eDITAR es valido', this.userForm.value);
      this.store.dispatch(updateUser({ user: { ...this.userForm.value, id: this.editUser!.id } }));
    }
  }
  agregar() {
    // this.store.dispatch(UserActions.addUser({ user: { id: 1,apellido:'asdasd', nombre: 'John Doe', email: 'john.doe@example.com' ,rol:'admin' } }));

    if (!this.userForm.valid) {
      this.userForm.markAllAsTouched();
      console.log('agregar Tiene errores');
    } else {
      console.log('agregar es valido', this.userForm.value);
      this.store.dispatch(addUser({ user: this.userForm.value }));
    }
  }
}
