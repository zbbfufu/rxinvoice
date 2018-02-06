import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {plainToClass} from 'class-transformer';
import {HttpClient} from '@angular/common/http';
import {ActivityModel} from '../../models/activity.model';

@Injectable()
export class ActivityService {

    private baseUrl = '/api/activities';

    constructor(private http: HttpClient) {
    }

    public fetchActivities(): Observable<ActivityModel[]> {
        return this.http
            .get(`${this.baseUrl}/latest`)
            .map((result: any) => plainToClass(ActivityModel, result as Object[]))
            .catch((response: Response) => Observable.throw({ message: 'Unable to fetch activities', response: response }));
    }

}
