import { Invoice } from './../models/invoice.model';
import { Injectable } from '@angular/core';

@Injectable()
export class InvoiceService {

    public fetchInvoices(): Invoice[] {
        return [
            new Invoice("0001", "Infoport"),
            new Invoice("0002", "ARRG")
        ];
    }
}