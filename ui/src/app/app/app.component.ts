import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../common/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    constructor(private translate: TranslateService,
                private authService: AuthenticationService,
                private router: Router) {}

    ngOnInit(): void {
        this.translate.setDefaultLang('');
        this.translate.use('');
        this.authService.fetchCurrent()
            .subscribe((user) => {
                if (user === null) {
                    this.router.navigate(['/login']);
                } else {
                    this.router.navigate(['/app/dashboard']);
                }
            });
    }

    onLogin() {
        if (this.router.url.indexOf('/login') > -1) {
            return true;
        } else {
            return false;
        }
    }
}
