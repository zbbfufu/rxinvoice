import {Component, OnInit, ViewChild} from '@angular/core';
import {CompanyModel} from '../../models/company.model';
import {FormGroup} from '@angular/forms';
import {CompanyService} from '../../common/services/company.service';

@Component({
    selector: 'customer-new',
    templateUrl: './customer-new.component.html',
    styleUrls: ['./customer-new.component.scss']
})
export class CustomerNewComponent implements OnInit {

    customer: CompanyModel;
    @ViewChild('f') form: FormGroup;

    constructor(private companyService: CompanyService) {
    }

    ngOnInit() {
    }

    public save(values) {
        values.patchValue(values);
    }

    public delete() {
        // delete
    }

}
