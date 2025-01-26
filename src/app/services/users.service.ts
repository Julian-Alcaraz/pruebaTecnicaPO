import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private jsonUrl = '../mocks/users.json'; // Ruta del archivo JSON

  constructor(private http: HttpClient) {}

  // Método para obtener los datos
  getUsers(): Observable<any> {
    return this.http.get<any>(this.jsonUrl).pipe(delay(1500));
  }
}
