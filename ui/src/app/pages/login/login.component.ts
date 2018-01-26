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
    public login(value) {
        this.authService.authenticate(value)
            .subscribe((user) =>  {
                if (user) {
                    this.router.navigate(['/app/dashboard']);
                } else {
                    // this.alertService.error({text: 'Votre connection a échouée, vérifiez votre identifiant et votre mot de passe'});
                }
            });
    }

}
