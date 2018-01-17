import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';

@Injectable()
export class LoggedInGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      const loggedIn = this.authService.isLogin();
      if (!loggedIn) {
        this.router.navigate(['/login']);
      } else {
          this.router.navigate(['/dashboard']);
      }
      console.log(loggedIn);
        return !!loggedIn;
  }
}
