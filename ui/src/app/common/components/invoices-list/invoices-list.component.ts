import {Component, Input} from '@angular/core';
import {InvoiceModel} from '../../../models/invoice.model';
import {Router} from '@angular/router';

@Component({
    selector: 'invoices-list',
    templateUrl: './invoices-list.component.html',
    styleUrls: ['./invoices-list.component.scss']
})
export class InvoicesListComponent {

    @Input() invoices: InvoiceModel[];
    @Input() isPending: false;

    constructor(private router: Router) { }

    public goToDetail(customer) {
        this.router.navigate(['/app/invoices/detail/' + customer._id]);
    }
}
