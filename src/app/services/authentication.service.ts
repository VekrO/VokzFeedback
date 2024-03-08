import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Login } from "../models/Login.model";
import { Register } from "../models/Register.model";

@Injectable()
export class AuthenticationService {

    private api: string = 'https://localhost:7000/api/v1/authentication';

    constructor(private http: HttpClient) {} 

    login(data: Login): Observable<{ token: string }> {
        return this.http.post<{ token: string }>(this.api + '/login', data);
    }

    register(data: Register): Observable<any> {
        return this.http.post<any>(this.api + '/register', data);
    }

    setToken(token: string) {
        localStorage.setItem('token', token);
    }

    getToken(): string {
        return localStorage.getItem('token') || '';
    }

}