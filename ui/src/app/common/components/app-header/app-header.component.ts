import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {User} from '../../../models/user.model';
import {ActivityModel} from '../../../models/activity.model';
import {ActivityService} from '../../services/activity.service';
import * as moment from 'moment';

@Component({
    selector: 'app-header',
    templateUrl: './app-header.component.html',
    styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {

    activityMenuOpen = false;
    user: User;
    activities: ActivityModel[];

    constructor(private authenticationService: AuthenticationService,
                private activityService: ActivityService) {
    }

    ngOnInit() {
        this.user = this.authenticationService.current();
        this.activityService.fetchActivities()
            .subscribe(activities => this.activities = activities);
    }

    public getMomentFromNow(date) {
        return moment(date).fromNow();
    }

}
