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

    public saveInvoice(invoice): Observable<InvoiceModel> {
        return this.http
            .put(`${this.baseUrl}/${invoice._id}`, invoice)
            .map((result: any) => plainToClass(InvoiceModel, result as Object))
            .catch((response: Response) => Observable.throw({ message: 'Unable to save invoice', response: response }));
    }

    public createInvoice(invoice): Observable<InvoiceModel> {
        return this.http
            .post(this.baseUrl, invoice)
            .map((result: any) => plainToClass(InvoiceModel, result as Object))
            .catch((response: Response) => Observable.throw({ message: 'Unable to create invoice', response: response }));
    }

    public deleteInvoice(invoice): Observable<InvoiceModel> {
        return this.http
            .delete(this.baseUrl + '/' + invoice._id)
            .map((result: any) => plainToClass(InvoiceModel, result as Object))
            .catch((response: Response) => Observable.throw({ message: 'Unable to delete invoice', response: response }));
    }
}
