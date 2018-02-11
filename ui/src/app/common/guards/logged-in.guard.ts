import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class LoggedInGuard implements CanActivate {

    constructor(private router: Router,
                private authService: AuthenticationService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const user = this.authService.current();
        if (user !== undefined && user !== null) {
            return true;
        } else {
            return this.authService.fetchCurrent()
                .map((fetchUser) => {
                    console.log('fetchCurrent');
                    if (fetchUser !== undefined && fetchUser !== null) {
                        return true;
                    } else {
                        this.router.navigate(['/login']);
                        return false;
                    }
                });
        }
    }
}
