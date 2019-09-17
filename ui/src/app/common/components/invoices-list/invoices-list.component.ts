import {Component, EventEmitter, Input, Output} from '@angular/core';
import {InvoiceModel} from '../../../models/invoice.model';
import {Router} from '@angular/router';
import {DownloadInvoiceService} from '../../services/download-invoice.service';

@Component({
    selector: 'invoices-list',
    templateUrl: './invoices-list.component.html',
    styleUrls: ['./invoices-list.component.scss']
})
export class InvoicesListComponent {

    @Input() invoices: InvoiceModel[];
    @Input() isPending: false;
    @Output() quickUpdate:  EventEmitter<InvoiceModel> = new EventEmitter();

    constructor(private router: Router,
                private downloadService: DownloadInvoiceService) { }

    public goToDetail(invoice) {
        this.router.navigate(['/app/invoices/detail/' + invoice._id]);
    }

    public seeInvoice(invoice) {
        this.downloadService.seeInvoice(invoice);
    }

    public downloadInvoice(invoice) {
        this.downloadService.downloadInvoice(invoice);
    }
}
