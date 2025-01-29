import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { concatMap, delay, Observable, of, throwError } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private jsonUrl = '../../assets/mocks/users.json'; // Ruta del archivo JSON
  id = 20;
  failFlag = false;
  constructor(private http: HttpClient) {}

  // Método para obtener los datos
  getUsers(): Observable<any> {
    return this.http.get<any>(this.jsonUrl).pipe(delay(2000));
  }

  addUser(user: User): Observable<any> {
    ++this.id;
    if (this.failFlag) {
      return of(null).pipe(
        delay(2000),
        concatMap(() => throwError(new Error('Simulated server error'))),
      );
    } else {
      return of({ ...user, id: this.id }).pipe(delay(2000));
    }
  }

  updateUser(user: User): Observable<any> {
    if (this.failFlag) {
      return of(null).pipe(
        delay(2000),
        concatMap(() => throwError(new Error('Simulated server error'))),
      );
    } else {
      return of(user).pipe(delay(2000));
    }
  }

  deleteUser(userId: number): Observable<any> {
    if (this.failFlag) {
      return of(null).pipe(
        delay(2000),
        concatMap(() => throwError(new Error('Simulated server error'))),
      );
    } else {
      return of(userId).pipe(delay(2000));
    }
  }
}
