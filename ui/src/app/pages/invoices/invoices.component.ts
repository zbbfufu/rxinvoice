import {Component, OnInit} from '@angular/core';
import {InvoiceStatusType} from '../../models/invoice-status.type';
import {InvoiceKindType} from '../../models/invoice-kind.type';
import {InvoiceModel} from '../../models/invoice.model';
import {InvoiceService} from '../../common/services/invoice.service';
import {RepositoryService} from '../../common/services/repository.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounce';
import 'rxjs/add/operator/debounceTime';


@Component({
    selector: 'invoices',
    templateUrl: './invoices.component.html',
    styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {

    searchForm: FormGroup;
    query: FormControl;
    startDate: FormControl;
    endDate: FormControl;
    buyer: FormControl;
    status: FormControl;
    kind: FormControl;

    invoices: InvoiceModel[];
    statuses: InvoiceStatusType[];
    kinds: InvoiceKindType[];
    filterString = 'REFERENCE';
    isPending = false;

    constructor(private fb: FormBuilder,
                private invoiceService: InvoiceService,
                private repositoryService: RepositoryService) {
        this.searchForm = fb.group({
            query: '',
            startDate: '' ,
            endDate: '',
            buyer: '',
            status: '',
            kind: ''
        });
    }

    ngOnInit() {
        this.repositoryService.fetchInvoiceStatus()
            .subscribe(statuses => this.statuses = statuses);
        this.kinds = this.repositoryService.fetchInvoiceKind();
        this.searchForm.valueChanges
            .distinctUntilChanged()
            .debounceTime( 2000 )
            .subscribe(() => {
                this.research();
            });
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
            .subscribe((invoices) => {
                this.invoices = invoices;
            });
    }


}
