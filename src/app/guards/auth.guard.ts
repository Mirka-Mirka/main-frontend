import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentToken = this.authService.currentTokenValue;
    const date = new Date().toISOString();
    if (currentToken){
      this.authService.logout();
      return true;
    } else{
      this.router.navigate(['/login']);
      return false;
    }
  }
}
