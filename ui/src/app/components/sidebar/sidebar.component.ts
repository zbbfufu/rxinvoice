import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor( private router: Router,
               private authService: AuthenticationService) { }
  activityMenu = false;

  ngOnInit() {
  }

    public logout() {
        this.authService.logout();
    }

}
