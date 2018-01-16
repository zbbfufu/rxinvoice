import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {plainToClass} from 'class-transformer';
import {HttpClient} from '@angular/common/http';
import {RevenueModel} from '../models/revenue.model';

@Injectable()
export class RevenueService {

    private baseUrl = '/api/revenues';

    constructor(private http: HttpClient) { }

    public getFiscalYearRevenues(): Observable<RevenueModel[]> {
        return this.http
            .get(this.baseUrl + ' /fiscal')
            .map((result: any) => plainToClass(RevenueModel, result as Object[]))
            .catch((response: Response) => Observable.throw({ message: 'Unable to fetch revenues', response: response }));
    }

}
