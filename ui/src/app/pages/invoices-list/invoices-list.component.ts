import { InvoiceService } from './../../services/invoice.service';
import { Invoice } from './../../models/invoice.model';
import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: './invoices-list.component.html',
    styleUrls: ['./invoices-list.component.scss']
})
export class InvoicesListComponent implements OnInit {

    invoices: Invoice[];

    constructor(private invoiceService: InvoiceService) { }

    ngOnInit() {
        this.invoices = this.invoiceService.fetchInvoices();
    }
}
