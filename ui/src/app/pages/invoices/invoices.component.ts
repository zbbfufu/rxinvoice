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
import {CurrencyPipe} from '@angular/common';
import {ActivatedRoute, Params, Router} from '@angular/router';


@Component({
    selector: 'invoices',
    templateUrl: './invoices.component.html',
    styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {

    public searchForm: FormGroup;

    public invoices: InvoiceModel[];
    public statusTypes: InvoiceStatusType[];
    public kinds: InvoiceKindType[];
    public filterString = 'object';
    public isPending = true;

    constructor(private fb: FormBuilder,
                private invoiceService: InvoiceService,
                private repositoryService: RepositoryService,
                private router: Router,
                private route: ActivatedRoute) {
        this.searchForm = fb.group({
            query: '',
            startDate: '',
            endDate: '',
            buyerRef: '',
            statuses: '',
            kind: ''
        });
    }

    ngOnInit() {
        const once = this.route.queryParamMap.subscribe((params: Params) => {
            this.searchForm.patchValue(params.params);
        });
        this.repositoryService.fetchInvoiceStatus()
            .subscribe(statuses => this.statusTypes = statuses);
        this.kinds = this.repositoryService.fetchInvoiceKind();
        this.searchForm.valueChanges
            .debounceTime(2000)
            .distinctUntilChanged()
            .subscribe(() => {
               if (once) {once.unsubscribe(); }
                this.research();
            });
    }

    toggleFilter(string) {
            this.filterString = string;
    }

    research() {
        this.invoices = [];
        this.isPending = true;
        this.invoiceService.fetchInvoices(this.searchForm.value)
            .subscribe(
                (invoices) => {
                    this.invoices = invoices;
                    this.isPending = false;
                    console.log('invoices :', invoices);
                    this.router.navigate([], {replaceUrl: false, queryParams: this.searchForm.value });
                },
                () => this.isPending = false);
    }

    public getGrossAmount() {
        if (this.invoices) {
            const amount = this.invoices
                .filter(invoices => invoices.grossAmount)
                .map(invoice => invoice.grossAmount)
                .reduce((a, b) => a + b, 0);
            return (new CurrencyPipe('en')).transform(`${amount}`, 'EUR', 'symbol', '4.2-2', 'fr');
        } else {
            return 0;
        }
    }
}
