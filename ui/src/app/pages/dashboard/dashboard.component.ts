import { Component, OnInit } from '@angular/core';
import {InvoiceModel} from '../../models/invoice.model';
import {InvoiceService} from '../../common/services/invoice.service';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    preparedInvoices: InvoiceModel[];
    validatedInvoices: InvoiceModel[];
    sentInvoices: InvoiceModel[];
    reviveInvoices: InvoiceModel[];
    isPending = true;

  constructor(private invoiceService: InvoiceService) { }

  ngOnInit() {
    this.invoiceService.fetchInvoices({status: 'DRAFT', startDate: '2018-01-01'})
        .subscribe(invoices => {
            this.preparedInvoices = invoices;
            this.isPending = false;
        });
    this.invoiceService.fetchInvoices({status: 'WAITING_VALIDATION', startDate: '2018-01-01'})
        .subscribe(invoices => this.validatedInvoices = invoices);
    this.invoiceService.fetchInvoices({status: 'SENT', startDate: '2018-01-01'})
        .subscribe(invoices => this.sentInvoices = invoices);
    this.invoiceService.fetchInvoices({status: 'LATE', startDate: '2018-01-01'})
        .subscribe(invoices => this.reviveInvoices = invoices);
  }
}
