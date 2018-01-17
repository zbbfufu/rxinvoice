import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../common/services/authentication.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    constructor(private router: Router,
                private authService: AuthenticationService) {}

    ngOnInit() {

    }

    authenticate(login) {
        this.authService.authenticate(login.login, login.password)
            .subscribe(
                () => this.router.navigate(['/dashboard']),
            );
    }

}
