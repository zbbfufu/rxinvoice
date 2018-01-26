import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {plainToClass} from 'class-transformer';
import {HttpClient} from '@angular/common/http';
import {InvoiceModel} from '../../models/invoice.model';
import {SearchParams} from '../../models/search-params.model';

@Injectable()
export class InvoiceService {

    private baseUrl = '/api/invoices';

    constructor(private http: HttpClient) { }

    public fetchInvoices(params): Observable<InvoiceModel[]> {
        return this.http
            .get(this.baseUrl, {params: SearchParams.toHttpParams(params)})
            .map((result: any) => plainToClass(InvoiceModel, result as Object[]))
            .catch((response: Response) => Observable.throw({ message: 'Unable to fetch invoices', response: response }));
    }


    public fetchInvoice(id): Observable<InvoiceModel> {
        return this.http
            .get(this.baseUrl + '/' + id)
            .map((result: any) => plainToClass(InvoiceModel, result as Object))
            .catch((response: Response) => Observable.throw({ message: 'Unable to fetch invoice', response: response }));
    }
}
