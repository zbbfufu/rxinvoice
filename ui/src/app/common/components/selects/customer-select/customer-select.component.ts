import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CompanyModel} from '../../../../models/company.model';
import {CompanyService} from '../../../services/company.service';
import {FormControl} from '@angular/forms';

@Component({
    selector: 'customer-select',
    templateUrl: './customer-select.component.html',
    styleUrls: ['./customer-select.component.scss'],

})

export class CustomerSelectComponent implements OnInit {

    @Input() isClearable = false;
    @Input() bindValue = '_id';
    @Input() isBindingId = false;
    @Input() label = 'company';
    @Input() control: FormControl;
    @Output() valueChange: EventEmitter<CompanyModel> = new EventEmitter();
    companies: CompanyModel[];


    constructor(private companyService: CompanyService) {
    }

    ngOnInit() {
        this.companyService.fetchCompanies()
            .subscribe(companies => this.companies = companies);
    }

    update(value) {
        this.control.patchValue(value);
        this.valueChange.emit(value);
    }
}
