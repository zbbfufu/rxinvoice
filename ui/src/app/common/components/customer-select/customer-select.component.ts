import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {CompanyModel} from '../../../models/company.model';
import {CompanyService} from '../../services/company.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
    selector: 'customer-select',
    templateUrl: './customer-select.component.html',
    styleUrls: ['./customer-select.component.scss'],

})

export class CustomerSelectComponent implements OnInit {

    @Input() isClearable = false;
    @Input() bindValue = '_id';
    @Input() label = 'company';
    @Input() control: FormControl;
    companies: CompanyModel[];
    form: FormGroup;


    constructor(private companyService: CompanyService,
                private fb: FormBuilder) {
    }

    ngOnInit() {

        this.companyService.fetchCompanies()
            .subscribe(companies => this.companies = companies);
    }

}
