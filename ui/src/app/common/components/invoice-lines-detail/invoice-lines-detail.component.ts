import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ControlContainer, NgForm} from '@angular/forms';
import {InvoiceLineModel} from '../../../models/invoice-line.model';
import {VATModel} from '../../../models/VAT.model';

@Component({
    selector: 'invoice-lines-detail',
    templateUrl: './invoice-lines-detail.component.html',
    styleUrls: ['./invoice-lines-detail.component.scss'],
    viewProviders: [{provide: ControlContainer, useExisting: NgForm}],
})
export class InvoiceLinesDetailComponent implements OnInit {

    @Input() lines: InvoiceLineModel[];
    @Input() companyRef: string;
    @Input() editMode: boolean;
    @Input() vatEnabled: boolean;

    @Output() linesChange: EventEmitter<InvoiceLineModel[]> = new EventEmitter();

    private newLine: InvoiceLineModel;

    ngOnInit() {
        if (!this.lines) {
            this.lines = [];
        }
        this.newLine = this.createNewLine();
    }

    public addLine() {
        this.lines.push(this.copyLine(this.newLine));
        this.linesChange.emit(this.lines);
        this.newLine = this.createNewLine();
    }

    public deleteLine(lineToRemove) {
        this.lines = this.lines.filter(line => line !== lineToRemove);
        this.linesChange.emit(this.lines);
    }

    private createNewLine(): InvoiceLineModel {
        let line = new InvoiceLineModel();
        line.vat = new VATModel();
        return line;
    }

    private copyLine(invoiceLine: InvoiceLineModel) {
        let lineCopy = new InvoiceLineModel();
        let vatModelCopy = new VATModel();
        vatModelCopy.vat = invoiceLine.vat.vat;
        vatModelCopy.amount = invoiceLine.vat.amount;
        Object.assign(lineCopy, invoiceLine);
        lineCopy.vat = vatModelCopy;
        return lineCopy;
    }
}
