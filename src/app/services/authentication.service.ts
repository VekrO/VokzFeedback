import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { Observable } from "rxjs";
import { APP } from "../../environments/environment";
import { Login } from "../models/Login.model";
import { Register } from "../models/Register.model";

@Injectable()
export class AuthenticationService {

    private api: string = APP.api + '/authentication';
    private router: Router = inject(Router);
    private http = inject(HttpClient);

    constructor() {} 

    login(data: Login): Observable<{ token: string }> {
        return this.http.post<{ token: string }>(this.api + '/login', data);
    }

    register(data: Register): Observable<any> {
        return this.http.post<any>(this.api + '/register', data);
    }

    getUserId(): string {

        const decoded: VokzAuthenticationPayload = jwtDecode(this.getToken());
        if(decoded && this.isAuthenticated()) {
            return decoded.Id;
        } else {
            return '';
        }

    }

    setToken(token: string) {
        localStorage.setItem('vokzfeedback-token', token);
    }

    getToken(): string {
        return localStorage.getItem('vokzfeedback-token') || '';
    }

    removeToken() {
        return localStorage.removeItem('vokzfeedback-token');
    }

    isAuthenticated(): boolean {

        const token: string = this.getToken();
        let isValid: boolean = false;

        if(!token) {
            return isValid;
        }

        const decoded: VokzAuthenticationPayload = jwtDecode(token);
        
        if(decoded && decoded.exp) {
            if (Date.now() >= decoded.exp * 1000) {
                isValid = false;
            } else {
                isValid = true;
            }
        }

        return isValid;

    }

    signout() {
        this.removeToken();
        this.router.navigate(['/login']);
    }

}

interface VokzAuthenticationPayload extends JwtPayload {
    Id: string;
}