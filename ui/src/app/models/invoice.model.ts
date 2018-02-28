import {CompanyModel} from './company.model';
import {VATModel} from './VAT.model';
import {BusinessModel} from './business.model';
import {InvoiceStatusType} from './invoice-status.type';
import {ActivityModel} from './activity.model';
import {InvoiceKindType} from './invoice-kind.type';
import {InvoiceLineModel} from './invoice-line.model';
import {StatusChangeModel} from './status-change.model';
import {BlobModel} from './blob.model';
import {DatePipe} from '@angular/common';

export class InvoiceModel {
    key: string;
    _id: string;
    reference: string;
    date: Date;
    dueDate: Date;
    sentDate: Date;
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
    attachments: BlobModel[];
    statusChanges: StatusChangeModel[];

    constructor() {
    }

    generatePdfFilename(invoice) {
        let filename = '';
        if (invoice) {
            if (invoice.reference) {
                filename = invoice.reference;
            }
            if (invoice.business && invoice.business.name) {
                if (filename) {
                    filename += '_';
                }
                filename += invoice.business.name;
            }
            if (invoice.date) {
                if (filename) {
                    filename += '_';
                }
                    filename += invoice.date;
            }
        }
        if (!filename) {
            filename = 'print_invoice';
        }
        return filename + '.pdf';
    }
}

