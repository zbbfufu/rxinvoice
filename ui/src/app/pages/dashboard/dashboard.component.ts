import {Component, OnInit} from '@angular/core';
import {InvoiceModel} from '../../models/invoice.model';
import {InvoiceService} from '../../common/services/invoice.service';
import {isNumber} from 'util';
import * as moment from 'moment';

@Component({
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    preparedInvoices: InvoiceModel[];
    validatedInvoices: InvoiceModel[];
    toSendInvoices: InvoiceModel[];
    reviveInvoices: InvoiceModel[];
    isPending = true;

    constructor(private invoiceService: InvoiceService) {
    }

    ngOnInit() {
        this.invoiceService.fetchToPrepareInvoices()
            .subscribe(invoices => {
                this.preparedInvoices = invoices;
                this.isPending = false;
            });
        this.invoiceService.fetchInvoices({statuses: 'WAITING_VALIDATION'})
            .subscribe(invoices => {
                this.validatedInvoices = invoices;
            });
        this.invoiceService.fetchInvoices({statuses: ['VALIDATED', 'READY']})
            .subscribe(invoices => this.toSendInvoices = invoices);
        this.invoiceService.fetchInvoices({statuses: 'LATE'})
            .subscribe(invoices => this.reviveInvoices = invoices);
    }

    getAmount(invoices: InvoiceModel[]) {
        if (invoices) {
            const number = invoices
                .filter(invoice => isNumber(invoice.grossAmount))
                .map(invoice => invoice.grossAmount)
                .reduce((a, b) => a + b, 0);
            return number;
        }
    }
}
