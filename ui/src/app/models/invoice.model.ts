import {CompanyModel} from './company.model';
import {VATModel} from './VAT.model';
import {BusinessModel} from './business.model';
import {InvoiceStatusType} from './invoice-status.type';
import {ActivityModel} from './activity.model';
import {InvoiceKindType} from './invoice-kind.type';
import {InvoiceLineModel} from './invoice-line.model';
import {StatusChangeModel} from './status-change.model';

export class InvoiceModel {
    key: string;
    _id: string;
    reference: string;
    DateTime: Date;
    dueDate: Date;
    status: InvoiceStatusType;
    withVAT: boolean;
    object: string;
    comment: string;
    customerInvoiceRef: string;
    kind: InvoiceKindType;
    seller: CompanyModel;
    buyer: CompanyModel;
    grossAmount: number;
    netAmount: number;
    vats: VATModel[];
    vatsAmount: VATModel[];
    business: BusinessModel;
    lines: InvoiceLineModel[];
    activities: ActivityModel[];
    attachments: Blob[];
    statusChanges: StatusChangeModel[];

    constructor() {}
}
