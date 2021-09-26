import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class LocalStorageService {
    
    constructor() {}

    setToken(data) {
        localStorage.setItem('token', data);
    }

    getToken(): string {
        return localStorage.getItem('token');
    }

    removeToken() {
        localStorage.removeItem('token');
    }
}