import {Injectable} from '@angular/core';
import {VATModel} from './VAT.model';

@Injectable()
export class InvoiceLineModel {
    description: string;
    quantity: number;
    unitCost: number;
    grossAmount: number;
    vat?: VATModel;

  constructor() { }

}


