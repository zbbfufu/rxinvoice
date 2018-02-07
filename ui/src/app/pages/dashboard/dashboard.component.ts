import {Component, OnInit} from '@angular/core';
import {InvoiceModel} from '../../models/invoice.model';
import {InvoiceService} from '../../common/services/invoice.service';
import {isNumber} from 'util';

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

    constructor(private invoiceService: InvoiceService) {
    }

    ngOnInit() {
        this.invoiceService.fetchInvoices({statuses: 'DRAFT', startDate: '2018-01-01'})
            .subscribe(invoices => {
                this.preparedInvoices = invoices;
                this.isPending = false;
            });
        this.invoiceService.fetchInvoices({statuses: 'WAITING_VALIDATION', startDate: '2018-01-01'})
            .subscribe(invoices => this.validatedInvoices = invoices);
        this.invoiceService.fetchInvoices({statuses: 'SENT', startDate: '2018-01-01'})
            .subscribe(invoices => this.sentInvoices = invoices);
        this.invoiceService.fetchInvoices({statuses: 'LATE', startDate: '2018-01-01'})
            .subscribe(invoices => this.reviveInvoices = invoices);
    }

    getAmount(invoices: InvoiceModel[]) {
        if (invoices) {
            const number = invoices
                .filter(invoice => isNumber(invoice.grossAmount))
                .map(invoice => invoice.grossAmount)
                .reduce((a, b) => a + b);
            console.log(number);
            return number;
        }
    }
}
