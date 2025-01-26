import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent {
  @Input() editUser!: User;
  constructor(private fb: FormBuilder) {}
  userForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    apellido: ['', [Validators.required]],
    email: ['', [Validators.required]],
    rol: ['', [Validators.required]],
  });

  get inputControl(): (input: string) => FormControl {
    return (input: string) => this.userForm.get(input) as FormControl;
  }
  editar(){}
  agregar(){}
}
