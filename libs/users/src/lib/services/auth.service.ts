import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
import { User } from '@nx-commerce/users';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    authApiUrl: string = environment.apiUrl + '/users';

    constructor(private http: HttpClient,
        private localStorageToken: LocalStorageService,
        private router: Router) {}

    login(email: string, password: string): Observable<User> {
        return this.http.post<User>(`${this.authApiUrl}/login`, {email, password})
    }

    logout() {
        this.localStorageToken.removeToken();
        this.router.navigate(['/login']);
    }
}