import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {InvoiceLineModel} from '../../../models/invoice-line.model';
import {plainToClass} from 'class-transformer';
import {VATModel} from '../../../models/VAT.model';

@Component({
  selector: 'invoice-lines-detail',
  templateUrl: './invoice-lines-detail.component.html',
  styleUrls: ['./invoice-lines-detail.component.scss']
})
export class InvoiceLinesDetailComponent implements OnInit {

    @Input() lines: InvoiceLineModel[];
    @Input() editMode: boolean;
    @Output() linesChange: EventEmitter<InvoiceLineModel[]> = new EventEmitter();
    @ViewChild('lineForm') lineForm: FormGroup;
    amount: number;

    ngOnInit() {
        if (!this.lines) { this.lines = []; }
    }

    public addLine() {
        const newLine = plainToClass(InvoiceLineModel, this.lineForm.value as Object);
        const vat = new VATModel();
        vat.amount = this.amount;
        newLine.vat = vat;
        this.lines.push(newLine);
        this.linesChange.emit(this.lines);
        this.lineForm.reset();
        this.amount = undefined;
    }

    public deletedLine(lineToRemove) {
        this.lines = this.lines.filter(line => line !== lineToRemove);
    }

}
