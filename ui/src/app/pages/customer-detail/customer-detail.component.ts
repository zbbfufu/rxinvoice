import {Component, OnInit, ViewChild} from '@angular/core';
import {CompanyModel} from '../../models/company.model';
import {FormGroup} from '@angular/forms';
import {CompanyService} from '../../common/services/company.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as _ from 'lodash';
import {SweetAlertService} from '../../common/services/sweetAlert.service';
import {AuthenticationService} from '../../common/services/authentication.service';
import 'rxjs/add/operator/filter';
import {Location} from '@angular/common';

@Component({
    selector: 'customer-detail',
    templateUrl: './customer-detail.component.html',
    styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {

    customer = new CompanyModel();
    editMode = false;
    companyId: string;
    isAdmin = false;
    returnUrl: string;
    @ViewChild('f') form: FormGroup;

    constructor(private companyService: CompanyService,
                private route: ActivatedRoute,
                private router: Router,
                private alertService: SweetAlertService,
                private authService: AuthenticationService,
                private location: Location) {
    }

    ngOnInit() {
        this.fetchCustomer();
        const user = this.authService.current();
        this.isAdmin = (user.roles.indexOf('admin') > -1);
    }

    private updateForm(obj) {
        return {
            name: obj.name,
            emailAddress: obj.emailAddress,
            address: obj.address,
            legalNotice: obj.legalNotice,
            detail: obj.detail,
        };
    }

    public fetchCustomer() {
        this.route.params.subscribe(params => {
            if (!this.companyId) {
                this.companyId = params['id'];
            }
            if (this.companyId) {
                this.companyService.fetchCompany(this.companyId)
                    .subscribe((company: CompanyModel) => {
                        this.form.setValue(this.updateForm(company));
                        this.customer = company;
                        console.log(company);
                    });
            } else {
                this.editMode = true;
            }
        });
    }

    public save() {
        if (!this.customer) {
            this.customer = new CompanyModel();
        }
        _.merge(this.customer, this.customer, this.form.value);
        this.companyService.updateCompany(this.customer).subscribe((company) => {
                this.customer = company;
                this.form.setValue(this.updateForm(company));
                this.editMode = false;
                this.alertService.success({title: 'alert.update.success', customClass: 'swal2-for-edit'});
            },
            () => {
                this.alertService.error({title: 'alert.update.error', customClass: 'swal2-for-edit'});
            });
    }

    public create() {
        this.customer = new CompanyModel;
        _.merge(this.customer, this.customer, this.form.value);
        this.companyService.createCompany(this.customer).subscribe((company) => {
                this.customer = company;
                this.form.setValue(this.updateForm(company));
                this.editMode = false;
                this.alertService.success({title: 'alert.creation.success', customClass: 'swal2-for-edit'});
            },
            () => {
                this.alertService.error({title: 'alert.creation.error', customClass: 'swal2-for-edit'});
            });
    }

    public reset() {
        this.form.setValue(this.updateForm(this.customer));
        this.editMode = false;
    }

    public delete() {
        this.alertService.confirm({title: 'alert.confirm.deletion'}).then(
            (result) => {
                if (result.value) {
                    this.companyService.deleteCompany(this.customer)
                        .subscribe(() => {
                            this.router.navigate(['customers']);
                        });
                }
            }
        );
    }

    public goBack() {
        this.location.back();
    }

}
