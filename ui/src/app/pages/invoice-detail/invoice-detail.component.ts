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
    editMode = false;
    invoiceId: string;
    statuses: InvoiceStatusType[];

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
    }

    private defineForm() {
        this.form = this.fb.group({
            buyer: new FormControl( this.invoice.buyer, Validators.required),
            businessName: new FormControl( this.invoice.business.name, Validators.required) ,
            kind: new FormControl( this.invoice.kind, Validators.required),
            dueDate: new FormControl( this.invoice.dueDate, Validators.required),
            status: new FormControl( this.invoice.status, Validators.required)
        });
        this.form.disable();
    }

    public fetchInvoice() {
        this.route.params.subscribe(params => {
            if (!this.invoiceId) { this.invoiceId = params['id']; }
            if (this.invoiceId) {
                this.invoiceService.fetchInvoice(this.invoiceId)
                    .subscribe((invoice:  InvoiceModel) => {
                        console.log(invoice);
                        this.invoice = invoice;
                        this.defineForm();
                    });
            }
        });
    }

    public save() {
        this.form.disable();
        if (!this.invoice) { this.invoice = new InvoiceModel(); }
        _.merge(this.invoice, this.invoice, this.form.value);
        this.invoiceService.saveInvoice(this.form.value)
            .subscribe();
    }

    public comparFn(item1, item2) {
        return item1._id === item2._id;
    }

    public create() {
        this.form.disable();
        this.invoice = new InvoiceModel();
        _.merge(this.invoice, this.invoice, this.form.value);
        this.invoiceService.createInvoice(this.invoice).subscribe((invoice) => {
            this.invoice = invoice;
            this.defineForm();
            this.editMode = false;
        });
    }

    public reset() {
        this.defineForm();
        this.editMode = false;
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

}
