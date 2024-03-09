// auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

// Em algum lugar onde você usa o canActivate
export const AuthGuard: CanActivateFn = (): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> => {
    return inject(AuthenticationService).isAuthenticated() ? true : inject(Router).navigate(['/login']); 
};

export const AuthenticatedGuard: CanActivateFn = (): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> => {
    return inject(AuthenticationService).isAuthenticated() ? inject(Router).navigate(['/dashboard']) : true
}