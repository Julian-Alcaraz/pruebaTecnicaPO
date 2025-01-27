import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';
import { addUser, updateUser } from 'src/app/store/actions/users.actions';
import { selectAddError, selectAddSuccess, selectLoadingUserAdd, selectLoadingUserUpdate, selectUpdateError, selectUpdateSuccess } from 'src/app/store/selectors/users.selector';
import { AppState } from 'src/app/store/state/app.state';
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
  public loading$: Observable<boolean> = new Observable();
  public error$: Observable<any> = new Observable();
  public success$: Observable<any> = new Observable();
  private destroy$ = new Subject<void>();
  message: string = '';

  constructor(private fb: FormBuilder, private store: Store<AppState>) {}

  ngOnInit() {
    if (this.editUser) {
      this.loading$ = this.store.select(selectLoadingUserUpdate).pipe(takeUntil(this.destroy$));
      this.error$ = this.store.select(selectUpdateError).pipe(takeUntil(this.destroy$));
      // this.success$ = this.store.select(selectUpdateSuccess).pipe(takeUntil(this.destroy$));
      this.userForm.patchValue(this.editUser);
    } else {
      this.loading$ = this.store.select(selectLoadingUserAdd).pipe(takeUntil(this.destroy$));
      this.error$ = this.store.select(selectAddError).pipe(takeUntil(this.destroy$));
      // this.success$ = this.store.select(selectAddSuccess).pipe(takeUntil(this.destroy$));
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
}
