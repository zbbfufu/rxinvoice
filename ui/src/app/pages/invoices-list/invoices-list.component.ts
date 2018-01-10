import { InvoiceService } from './../../services/invoice.service';
import { Invoice } from './../../models/invoice.model';
import { Component, OnInit } from '@angular/core';
import {RepositoryService} from '../../services/repository.service';
import {InvoiceStatusType} from '../../models/invoice-status.type';
import {InvoiceKindType} from '../../models/invoice-kind.type';

@Component({
    templateUrl: './invoices-list.component.html',
    styleUrls: ['./invoices-list.component.scss']
})
export class InvoicesListComponent implements OnInit {

    invoices: Invoice[];
    statuses: InvoiceStatusType[];
    kinds: InvoiceKindType[];

    constructor(private invoiceService: InvoiceService,
                private repositoryService: RepositoryService) { }

    ngOnInit() {
        this.invoices = this.invoiceService.fetchInvoices();
        this.statuses = this.repositoryService.fetchInvoiceStatus();
        this.kinds = this.repositoryService.fetchInvoiceKind();
    }

    public getStatusLabel(status: string) {
      switch (status) {
        case 'toBeRelaunched' :
          return 'À relancer';

        case 'toSend' :
          return 'À envoyer';

        case 'toBeValidated' :
          return 'À valider';

        case 'toPrepare' :
          return 'À préparer';

        default :
          return status;
      }
    }

}
