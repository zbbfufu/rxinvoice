import {Component, OnInit} from '@angular/core';
import {CompanyService} from '../../services/company.service';
import {CompanyModel} from '../../models/company.model';

@Component({
    selector: 'customers',
    templateUrl: './customers.component.html',
    styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

    companies: CompanyModel[];
    filterString: string;


    constructor(private companyService: CompanyService) {
    }

    ngOnInit() {
        this.companyService.fetchCompanies().subscribe((companies) => this.companies = companies);
    }

    toggleFilter(string) {
        if (this.filterString && this.filterString === string) {
            this.filterString = undefined;
        } else {
            this.filterString = string;
        }
    }
}
