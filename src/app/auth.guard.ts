import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree {
    
    if (this.authService.IsLoggedIn()) {
      return true; // L'utente è autenticato, permetto l'accesso alla rotta
    } else {
      // L'utente non è autenticato, reindirizzo alla pagina di login
      return this.router.parseUrl('/login');
    }
  }
}
