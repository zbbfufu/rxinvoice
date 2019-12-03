import {Component, OnInit} from '@angular/core';
import {InvoiceStatusType} from '../../models/invoice-status.type';
import {InvoiceKindType} from '../../models/invoice-kind.type';
import {InvoiceModel} from '../../models/invoice.model';
import {InvoiceService} from '../../common/services/invoice.service';
import {RepositoryService} from '../../common/services/repository.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounce';
import 'rxjs/add/operator/debounceTime';
import {CurrencyPipe} from '@angular/common';
import {ActivatedRoute, Params, Router} from '@angular/router';
import * as moment from 'moment';
import {DateUtils} from "../../common/utils/date-utils";
import {SearchParams} from "../../models/search-params.model";

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
    public showQuickPanelStatusEdit = false;
    public selectedForQuickUpdate: InvoiceModel;

    constructor(private fb: FormBuilder,
                private invoiceService: InvoiceService,
                private repositoryService: RepositoryService,
                private router: Router,
                private route: ActivatedRoute) {
        this.searchForm = fb.group({
            query: '',
            startDate: moment().subtract(7, 'days').toDate(),
            endDate: '',
            buyerRef: '',
            statuses: '',
            kind: ''
        });
    }

    ngOnInit() {
        const once = this.route.queryParamMap.subscribe((params: Params) => {
            let searchParams = Object.assign({}, params.params);
            if (searchParams.startDate) {
                searchParams.startDate = DateUtils.stringToDate(searchParams.startDate);
            }
            if (searchParams.endDate) {
                searchParams.endDate = DateUtils.stringToDate(searchParams.endDate);
            }
            this.searchForm.patchValue(searchParams);
        });
        this.repositoryService.fetchInvoiceStatus()
            .subscribe(statuses => this.statusTypes = statuses);
        this.kinds = this.repositoryService.fetchInvoiceKind();
        this.searchForm.valueChanges
            .debounceTime(250)
            .distinctUntilChanged()
            .subscribe(() => {
                if (once) {
                    once.unsubscribe();
                }
                this.research();
            });
        this.research();
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
                    let searchParams = Object.assign({}, this.searchForm.value);
                    if (searchParams.startDate) {
                        searchParams.startDate = DateUtils.dateToString(searchParams.startDate);
                    }
                    if (searchParams.endDate) {
                        searchParams.endDate = DateUtils.dateToString(searchParams.endDate);
                    }
                    this.router.navigate([], {replaceUrl: false, queryParams: searchParams});
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

    public selectForQuickUpdate(invoice) {
        this.selectedForQuickUpdate = invoice;
    }

    public closeQuickUpdate(): void {
        this.selectedForQuickUpdate = undefined;
        this.research();
    }

    public updatedInvoice(invoice: InvoiceModel) {
        this.invoiceService.saveInvoice(invoice)
            .subscribe(value => {
                this.selectedForQuickUpdate = value;
                this.closeQuickUpdate();
            });
    }

    public buildUri(): string {
        return "/api/exports/invoices?" + SearchParams.toHttpParams(this.searchForm.value).toString();
    }
}
