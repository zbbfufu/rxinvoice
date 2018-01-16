import {Component, Input} from '@angular/core';

@Component({
    selector: 'invoices-list',
    templateUrl: './invoices-list.component.html',
    styleUrls: ['./invoices-list.component.scss']
})
export class InvoicesListComponent {

    @Input() filterString: string;

    constructor() { }

    public getStatusLabel(status: string) {
      switch (status) {
        case 'toBeRelaunched' :
          return 'À relancer';

        case 'toSend' :
          return 'À envoyer';

        case 'toBeValidated' :
          return 'À valider';

        case 'toPrepare' :
          return 'À préparer';

        default :
          return status;
      }
    }
}
