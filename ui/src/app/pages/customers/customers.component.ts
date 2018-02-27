import {Component, OnInit} from '@angular/core';
import {CompanyService} from '../../common/services/company.service';
import {CompanyModel} from '../../models/company.model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'customers',
    templateUrl: './customers.component.html',
    styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

    companies: CompanyModel[];
    filterString: string;
    isPending = true;
    query: string;


    constructor(private companyService: CompanyService,
                private router: Router,
                private route: ActivatedRoute) {
        this.toggleFilter('NAME');
    }

    ngOnInit() {
        this.route.queryParamMap.subscribe(params => {
            this.query = params.get('query');
        });
        this.search();
        // TODO add computed info mix with company model, maybe like a companyInfo to get
        // all the revenues and fiscal info depending of the current user fiscalyear variable

    }

    public search() {
        this.companies = [];
        this.isPending = true;
        this.companyService.fetchCompanies(this.query)
            .subscribe((companies) => {
                this.companies = companies;
                this.isPending = false;
                this.router.navigate([], { replaceUrl: true, queryParams: {query: this.query} });
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
