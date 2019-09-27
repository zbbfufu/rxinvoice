import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {InvoiceLineModel} from "../../../../models/invoice-line.model";
import {VATModel} from "../../../../models/VAT.model";
import {ControlContainer, NgForm} from "@angular/forms";

@Component({
    selector: 'invoice-line-form',
    templateUrl: './invoice-line-form.component.html',
    styleUrls: ['./invoice-line-form.component.scss'],
    viewProviders: [{provide: ControlContainer, useExisting: NgForm}]
})
export class InvoiceLineFormComponent implements OnInit {

    constructor() {
    }

    @Input() companyRef: string;
    @Input() line: InvoiceLineModel;
    @Input() editionMode: InvoiceLineEditionMode;
    @Input() editable: boolean;
    @Input() vatEnabled: boolean;

    @Output() lineAdded: EventEmitter<InvoiceLineModel> = new EventEmitter();
    @Output() lineDeleted: EventEmitter<InvoiceLineModel> = new EventEmitter();

    ngOnInit() {
    }

    private computeGrossAmount(): void {
        if (this.line && this.line.quantity && this.line.unitCost) {
            this.line.grossAmount = this.line.quantity * this.line.unitCost;
        } else {
            this.line.grossAmount = 0;
        }
    }

    public updateVat(vatModel: VATModel) {
        this.line.vat = vatModel;
    }

    private unitCostChanged(unitCost: number): void {
        this.line.unitCost = unitCost;
        this.computeGrossAmount();
    }

    private quantityChanged(quantity: number): void {
        this.line.quantity = quantity;
        this.computeGrossAmount();
    }

    public addLine() {
        this.lineAdded.emit(this.line);
    }
    
    public deleteLine() {
        this.lineDeleted.emit(this.line);
    }
}
