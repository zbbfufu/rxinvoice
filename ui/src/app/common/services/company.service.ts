import { Injectable } from '@angular/core';
import { CompanyModel } from '../../models/company.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { plainToClass } from 'class-transformer';

@Injectable()
export class CompanyService {

    private baseUrl = '/api/companies';

    constructor(private http: HttpClient) { }

    public fetchCompanies(query?): Observable<CompanyModel[]> {
        return this.http
            .get(this.baseUrl + ( query ? '&query=' + query : ''))
            .map((result: any) => plainToClass(CompanyModel, result as Object[]))
            .catch((response: Response) => Observable.throw({ message: 'Unable to fetch companies', response: response }));
    }

    public fetchCompanyBuyers(): Observable<CompanyModel[]> {
        return this.http
            .get(this.baseUrl + '/buyers')
            .map((result: any) => plainToClass(CompanyModel, result as Object[]))
            .catch((response: Response) => Observable.throw({ message: 'Unable to fetch buyers', response: response }));
    }

    public fetchCompany(id): Observable<CompanyModel[]> {
        return this.http
            .get(this.baseUrl + '/' + id)
            .map((result: any) => plainToClass(CompanyModel, result as Object))
            .catch((response: Response) => Observable.throw({ message: 'Unable to fetch company', response: response }));
    }
}
