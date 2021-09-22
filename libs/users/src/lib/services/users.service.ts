import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { User } from '@nx-commerce/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  
  usersApiUrl: string = environment.apiUrl + '/users';
  
  constructor(private http: HttpClient) {}

  getUser(userId: string): Observable<User> {
    return this.http.get<User>(`${this.usersApiUrl}/${userId}`);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersApiUrl);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.usersApiUrl, user);
  }
  
  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.usersApiUrl}/${user.id}`, user);
  }

  deleteUser(userId: string):Observable<User> {
    return this.http.delete<User>(`${this.usersApiUrl}/${userId}`);
  } 

}