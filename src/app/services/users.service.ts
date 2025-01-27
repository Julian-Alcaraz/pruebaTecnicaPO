import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, Observable, of } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private jsonUrl = '../../assets/mocks/users.json'; // Ruta del archivo JSON
  id = 20;
  constructor(private http: HttpClient) {}

  // Método para obtener los datos
  getUsers(): Observable<any> {
    return this.http.get<any>(this.jsonUrl).pipe(delay(2000));
  }

  addUser(user: User): Observable<any> {
    ++this.id;
    return of({ ...user, id: this.id }).pipe(delay(2000));
  }
  updateUser(user: User): Observable<any> {
    return of(user).pipe(delay(2000));
  }
  deleteUser(userId: number): Observable<any> {
    return of(userId).pipe(delay(2000));
  }
}
