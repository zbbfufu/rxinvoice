import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../common/services/authentication.service';
import {SweetAlertService} from '../../common/services/sweetAlert.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    constructor(private router: Router,
                private authService: AuthenticationService,
                private alertService: SweetAlertService,) {}

    ngOnInit() {

    }
    public login(value) {
        this.authService.authenticate(value)
            .subscribe((user) =>  {
                if (user) {
                    this.router.navigate(['/app/dashboard']);
                } else {
                    this.alertService.error({
                        text: 'login.alert.check',
                        title: 'login.alert.fail',
                        customClass: 'swal2-for-login'
                    });
                }
            });
    }

}
