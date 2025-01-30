import { Component, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { CONSTANTS } from 'src/app/config/constants';
import { User } from 'src/app/interfaces/user.interface';
import { addUser, updateUser } from 'src/app/store/actions/users.actions';
import { selectLoadingUserAdd, selectLoadingUserUpdate } from 'src/app/store/selectors/users.selector';
import { AppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit, OnDestroy {
  @Input() editUser!: User | null;
  userForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    apellido: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    email: ['', [Validators.required, Validators.email]],
    rol: ['', []],
  });
  public loading$: Observable<boolean> = new Observable();
  private destroy$ = new Subject<void>();
  rols: string[] = [];

  constructor(private fb: FormBuilder, private store: Store<AppState>) {
    this.rols = CONSTANTS.ROLS;
  }

  ngOnInit() {
    if (this.editUser) {
      this.loading$ = this.store.select(selectLoadingUserUpdate).pipe(takeUntil(this.destroy$));
      this.userForm.patchValue(this.editUser);
    } else {
      this.loading$ = this.store.select(selectLoadingUserAdd).pipe(takeUntil(this.destroy$));
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['editUser'] && this.editUser) {
      this.userForm.patchValue(this.editUser);
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get inputControl(): (input: string) => FormControl {
    return (input: string) => this.userForm.get(input) as FormControl;
  }

  editar() {
    if (!this.userForm.valid) {
      this.userForm.markAllAsTouched();
    } else {
      this.store.dispatch(updateUser({ user: { ...this.userForm.value, id: this.editUser!.id } }));
    }
  }

  agregar() {
    if (!this.userForm.valid) {
      this.userForm.markAllAsTouched();
    } else {
      this.store.dispatch(addUser({ user: this.userForm.value }));
    }
  }
  clean() {
    this.userForm.reset();
    this.userForm.patchValue({ rol: '' });
  }
}
