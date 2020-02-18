import {InvoiceLineModel} from '../../../models/invoice-line.model';

export class LineMoveEvent {

    line: InvoiceLineModel;
    direction: number;


    constructor(line: InvoiceLineModel, direction: number) {
        this.line = line;
        this.direction = direction;
    }
}
