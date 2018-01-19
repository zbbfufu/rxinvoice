import {Component, OnInit, ViewChild} from '@angular/core';
import {InvoiceStatusType} from '../../models/invoice-status.type';
import {InvoiceKindType} from '../../models/invoice-kind.type';
import {InvoiceModel} from '../../models/invoice.model';
import {InvoiceService} from '../../common/services/invoice.service';
import {RepositoryService} from '../../common/services/repository.service';
import {CompanyModel} from '../../models/company.model';
import {CompanyService} from '../../common/services/company.service';
import {FormGroup, NgForm} from '@angular/forms';

@Component({
  selector: 'invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {

    invoices: InvoiceModel[];
    statuses: InvoiceStatusType[];
    kinds: InvoiceKindType[];
    companies: CompanyModel[];
    filterString = 'REFERENCE';
    isPending = false;
    @ViewChild('searchForm') searchForm: FormGroup;

  constructor(private invoiceService: InvoiceService,
              private companyService: CompanyService,
              private repositoryService: RepositoryService) { }

    ngOnInit() {
       this.research();
        this.repositoryService.fetchInvoiceStatus()
            .subscribe(statuses => this.statuses = statuses);
        this.kinds = this.repositoryService.fetchInvoiceKind();
        this.companyService.fetchCompanies()
            .subscribe(companies => this.companies = companies);
    }

    toggleFilter(string) {
        if (this.filterString && this.filterString === string) {
            this.filterString = undefined;
        } else {
            this.filterString = string;
        }
    }

    research() {
        this.invoiceService.fetchInvoices(this.searchForm.value)
            .subscribe( (invoices) => {
                this.invoices = invoices;
            });
    }

}
