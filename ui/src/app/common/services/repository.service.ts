import {Injectable} from '@angular/core';
import {InvoiceStatusType} from '../../models/invoice-status.type';
import {InvoiceKindType} from '../../models/invoice-kind.type';

@Injectable()
export class RepositoryService {

    statuses: InvoiceStatusType[]  = [
        'DRAFT', 'READY', 'SENT', 'LATE', 'PAID', 'CANCELLED',
        'WAITING_VALIDATION', 'VALIDATED'
    ];

    kinds: InvoiceKindType[] = [
        'SUBCONTRACTING', 'FEE', 'SERVICE', 'BUY_SELL', 'TRAINING', 'HOSTING'
    ];

    constructor() {
    }

    public fetchInvoiceStatus(): InvoiceStatusType[] {
        return this.statuses;
    }

    public fetchInvoiceKind(): InvoiceKindType[] {
        return this.kinds;
    }

}
