import {Component, OnInit, ViewChild} from '@angular/core';
import {CompanyModel} from '../../models/company.model';
import {FormGroup} from '@angular/forms';
import {CompanyService} from '../../common/services/company.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as _ from 'lodash';


@Component({
    selector: 'customer-detail',
    templateUrl: './customer-detail.component.html',
    styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {

    customer = new CompanyModel();
    editMode = false;
    companyId: string;
    @ViewChild('f') form: FormGroup;

    constructor(private companyService: CompanyService,
                private route: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit() {
        this.fetchCustomer();
    }

    private updateForm(obj) {
        return {
            name: obj.name,
            fullName: obj.fullName,
            emailAddress: obj.emailAddress,
            address: obj.address,
            lastSendDate: obj.lastSendDate,
            lastPaymentDate: obj.lastPaymentDate,
            detail: obj.detail
        };
    }

    public fetchCustomer() {
        this.route.params.subscribe(params => {
            if (!this.companyId) { this.companyId = params['id']; }
            if (this.companyId) {
                this.companyService.fetchCompany(this.companyId)
                    .subscribe((company:  CompanyModel) => {
                        this.form.setValue(this.updateForm(company));
                        this.customer = company;
                    });
            }
        });
    }

    public save() {
        if (!this.customer) { this.customer = new CompanyModel(); }
        _.merge(this.customer, this.customer, this.form.value);
        this.companyService.updateCompany(this.customer).subscribe((company) => {
            this.customer = company;
            this.form.setValue(this.updateForm(company));
            this.editMode = false;
        });
    }

    public create() {
        this.customer = new CompanyModel;
        _.merge(this.customer, this.customer, this.form.value);
        this.companyService.createCompany(this.customer).subscribe((company) => {
            this.customer = company;
            this.form.setValue(this.updateForm(company));
            this.editMode = false;
        });
    }

    public reset() {
        this.form.setValue(this.updateForm(this.customer));
        this.editMode = false;
    }

    public delete() {
        confirm('Are you sur you want to delete the company?');
        // FIXME add confirm
        // this.companyService.deleteCompany(this.customer)
        //     .subscribe(() => {
        //
        //     });
        this.router.navigate(['customers']);
    }


    public getRevenues() {
        // getRevenues
    }

    public getDebt() {
        // delete
    }

}
