import {CompanyKindType} from './company-kind.type';
import {BusinessModel} from './business.model';
import {VATModel} from './VAT.model';
import {FiscalYearModel} from './fiscalYear.model';
import {InvoiceInfoModel} from './InvoiceInfo.model';
import {AddressModel} from "./address.model";

export class CompanyModel {
    _id: string;
    name: string;
    fullName?: string;
    detail?: string;

    legalNotice?: string;
    showLegalNoticeForeignBuyer?: boolean;
    address: AddressModel;
    metrics?: {invoiced: number, paid: number};
    business?: BusinessModel[];
    vats?: VATModel[];
    kind?: CompanyKindType;
    fiscalYear?: FiscalYearModel;
    creationDate?: Date;
    emailAddress: string;
    lastSendDate?: Date;
    lastPaymentDate?: Date;
    lastSentInvoice?: InvoiceInfoModel;
    lastPaidInvoice?: InvoiceInfoModel;

  constructor() {
  }
}
