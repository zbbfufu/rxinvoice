import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivityModel} from '../../../models/activity.model';
import * as moment from 'moment';

@Component({
    selector: 'activity-panel',
    templateUrl: './activity-panel.component.html',
    styleUrls: ['./activity-panel.component.scss']
})
export class ActivityPanelComponent implements OnInit {

    @Input() activities: ActivityModel[];
    @Input() editMode: boolean;
    @Output() activitiesChange: EventEmitter<ActivityModel[]> = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

    getMomentFromNow(date) {
        return moment(date).fromNow();
    }

}
