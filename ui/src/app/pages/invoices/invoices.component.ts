import { Component, OnInit } from '@angular/core';
import {InvoiceStatusType} from '../../models/invoice-status.type';
import {InvoiceKindType} from '../../models/invoice-kind.type';
import {Invoice} from '../../models/invoice.model';
import {InvoiceService} from '../../services/invoice.service';
import {RepositoryService} from '../../services/repository.service';

@Component({
  selector: 'invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {

    invoices: Invoice[];
    statuses: InvoiceStatusType[];
    kinds: InvoiceKindType[];
    filterString: string;

  constructor(private invoiceService: InvoiceService,
              private repositoryService: RepositoryService) { }

    ngOnInit() {
        this.invoices = this.invoiceService.fetchInvoices();
        this.statuses = this.repositoryService.fetchInvoiceStatus();
        this.kinds = this.repositoryService.fetchInvoiceKind();
    }

    toggleFilter(string) {
        if (this.filterString && this.filterString === string) {
            this.filterString = undefined;
        } else {
            this.filterString = string;
        }
    }

}
