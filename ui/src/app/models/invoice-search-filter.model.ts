import {InvoiceStatusType} from './invoice-status.type';
import {InvoiceKindType} from './invoice-kind.type';

export class InvoiceSearchFilterModel {

    query: string;
    startDate: Date;
    endDate: Date;
    buyerRef: string;
    status: InvoiceStatusType;
    kind: InvoiceKindType;

}