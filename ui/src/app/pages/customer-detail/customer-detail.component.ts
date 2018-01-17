import {Component, OnInit, ViewChild} from '@angular/core';
import {CompanyModel} from '../../models/company.model';
import {FormGroup} from '@angular/forms';
import {CompanyService} from '../../common/services/company.service';

@Component({
    selector: 'customer-detail',
    templateUrl: './customer-detail.component.html',
    styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {

    customer = new CompanyModel();
    editMode = true;
    @ViewChild('f') form: FormGroup;

    constructor(private companyService: CompanyService) {
    }

    ngOnInit() {
    }

    public save(values) {
        values.patchValue(values);
    }


    public getRevenues() {
        // return this.customer.business.map(bsn.);
    }

    public getDebt() {
        // delete
    }

}
