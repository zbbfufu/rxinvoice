import {Component, OnInit} from '@angular/core';
import {CompanyService} from '../../common/services/company.service';
import {CompanyModel} from '../../models/company.model';

@Component({
    selector: 'customers',
    templateUrl: './customers.component.html',
    styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

    companies: CompanyModel[];
    filterString: string;
    isPending = true;


    constructor(private companyService: CompanyService) {
        this.toggleFilter('NAME');
    }

    ngOnInit() {
        // TODO add computed info mix with company model, maybe like a companyInfo to get
        // all the revenues and fiscal info depending of the current user fiscalyear variable
        this.search();
    }

    public search(query?) {
        this.companies = [];
        this.isPending = true;
        // TODO add search with optional string query into companyResource.java
        this.companyService.fetchCompanies(query)
            .subscribe((companies) => {
                this.companies = companies;
                this.isPending = false;
            });
    }

    public toggleFilter(string) {
        if (this.filterString && this.filterString === string) {
            this.filterString = undefined;
        } else {
            this.filterString = string;
        }
    }

    public getNumberOfBusiness() {
        if (this.companies) {
            return this.companies.filter(company => company.business)
                .map(company => company.business.length)
                .reduce((a, b) => a + b, 0);
        } else {
            return 0;
        }
    }

}
