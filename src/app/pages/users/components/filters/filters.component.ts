import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CONSTANTS } from 'src/app/config/constants';
import { filterUsers } from 'src/app/store/actions/users.actions';
import { selectLoadingUser } from 'src/app/store/selectors/users.selector';
import { AppState } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
})
export class FiltersComponent implements OnInit {
  loading$: Observable<boolean> = new Observable();
  rols: string[] = [];
  filterForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.minLength(2), Validators.maxLength(80)]],
    rol: ['', []],
  });

  constructor(private store: Store<AppState>, private fb: FormBuilder) {
    this.rols = CONSTANTS.ROLS;
    this.rols.push('No Rol');
  }

  ngOnInit() {
    this.loading$ = this.store.select(selectLoadingUser);
  }

  filterList() {
    const nameFilter = this.filterForm.get('nombre')?.value;
    const rolFilter = this.filterForm.get('rol')?.value;
    this.store.dispatch(filterUsers({ nameFilter, rolFilter }));
  }
  clean() {
    this.filterForm.patchValue({ nombre: '', rol: '' });
    const nameFilter = '';
    const rolFilter = '';
    this.store.dispatch(filterUsers({ nameFilter, rolFilter }));
  }

  get inputControl(): (input: string) => FormControl {
    return (input: string) => this.filterForm.get(input) as FormControl;
  }
}
