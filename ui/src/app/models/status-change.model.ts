import { Injectable } from '@angular/core';
import {VATModel} from './VAT.model';
import {UserInfoModel} from './user-info.model';
import {InvoiceStatusType} from './invoice-status.type';

@Injectable()
export class StatusChangeModel {
    from: InvoiceStatusType;
    to: InvoiceStatusType;
    by: UserInfoModel;
    comment: string;
    timestamp: Date;

  constructor() { }

}


