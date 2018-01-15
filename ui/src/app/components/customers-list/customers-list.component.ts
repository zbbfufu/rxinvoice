import {Component, Input, OnInit} from '@angular/core';
import {CompanyModel} from '../../models/company.model';

@Component({
    selector: 'customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss']
})
export class CustomersListComponent implements OnInit {

  @Input() companies: CompanyModel[];
  @Input() filterString: string;

  constructor() { }

  ngOnInit() {
  }

}
