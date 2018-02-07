import {Component, OnInit} from '@angular/core';
import {CompanyModel} from '../../models/company.model';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CompanyService} from '../../common/services/company.service';
import {InvoiceModel} from '../../models/invoice.model';
import {InvoiceService} from '../../common/services/invoice.service';
import {InvoiceKindType} from '../../models/invoice-kind.type';
import {RepositoryService} from '../../common/services/repository.service';
import {InvoiceStatusType} from '../../models/invoice-status.type';
import * as _ from 'lodash';

@Component({
    selector: 'invoice-detail',
    templateUrl: './invoice-detail.component.html',
    styleUrls: ['./invoice-detail.component.scss']
})
export class InvoiceDetailComponent implements OnInit {

    form: FormGroup;

    companies: CompanyModel[];
    kinds: InvoiceKindType[];
    invoice = new InvoiceModel();
    invoiceId: string;
    statuses: InvoiceStatusType[];
    selectedCompany: CompanyModel;

    constructor(private fb: FormBuilder,
                private companyService: CompanyService,
                private repositoryService: RepositoryService,
                private invoiceService: InvoiceService,
                private route: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit() {
        this.fetchInvoice();
        this.kinds = this.repositoryService.fetchInvoiceKind();
        this.repositoryService.fetchInvoiceStatus()
            .subscribe(statuses => this.statuses = statuses);
        this.companyService.fetchCompanies()
            .subscribe(companies => this.companies = companies);
        this.form = this.fb.group({
            buyer: new FormControl('', Validators.required),
            business: new FormControl('', Validators.required),
            object: new FormControl('', Validators.required),
            kind: new FormControl('', Validators.required),
            dueDate: new FormControl(''),
            status: new FormControl('', Validators.required),
            comment: new FormControl('')
        });
        if (!this.invoiceId) {
            this.form.enable();
        }
    }

    private setForm() {
        this.form.setValue({
            buyer: this.invoice.buyer,
            object: this.invoice.object,
            business: this.invoice.business,
            kind: this.invoice.kind,
            dueDate: this.invoice.dueDate,
            status: this.invoice.status,
            comment: this.invoice.comment
        });
        this.form.disable();
    }

    public fetchInvoice() {
        this.route.params.subscribe(params => {
            if (!this.invoiceId) {
                this.invoiceId = params['id'];
            }
            if (this.invoiceId) {
                this.invoiceService.fetchInvoice(this.invoiceId)
                    .subscribe((invoice: InvoiceModel) => {
                        console.log(invoice);
                        this.invoice = invoice;
                        if (invoice.buyer) {this.fetchBuyer(invoice.buyer);}
                        this.setForm();
                    });
            }
        });
    }

    public save() {
        this.form.disable();
        if (!this.invoice) {
            this.invoice = new InvoiceModel();
        }
        _.merge(this.invoice, this.invoice, this.form.value);
        this.invoiceService.saveInvoice(this.invoice)
            .subscribe(invoice => {
                this.invoice = invoice;
                this.setForm();
            });
    }

    public comparRef(item1, item2) {
        return item1.reference === item2.reference;
    }

    public create() {
        this.form.disable();
        this.invoice = new InvoiceModel();
        _.merge(this.invoice, this.invoice, this.form.value);
        this.invoiceService.createInvoice(this.invoice).subscribe((invoice) => {
            this.invoice = invoice;
            this.setForm();
        });
    }

    public reset() {
        this.setForm();
    }

    public delete() {
        confirm('Are you sur you want to delete the invoice?');
        // FIXME add confirm
        // this.invoiceService.deleteCompany(this.invoice)
        //     .subscribe(() => {
        //
        //     });
        this.router.navigate(['invoices']);
    }

    public getSentDate() {
        if (!this.invoice.statusChanges) {
            return;
        }
        const status = this.invoice.statusChanges.find(stat => stat.to === 'SENT');
        if (status) {
            return status.timestamp;
        }
    }

    public fetchBuyer(value) {
        if (value) {
            this.companyService.fetchCompany(value._id)
                .subscribe( company => {
                    this.selectedCompany = company;
                console.log('company: ', company);
                });
        } else {
            this.selectedCompany = undefined;
        }
    }
}
