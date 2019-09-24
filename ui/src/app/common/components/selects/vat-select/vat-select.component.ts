import {Component, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {VATModel} from "../../../../models/VAT.model";
import {CompanyService} from "../../../services/company.service";

const VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => VatSelectComponent),
    multi: true
};

@Component({
    selector: 'vat-select',
    templateUrl: './vat-select.component.html',
    styleUrls: ['./vat-select.component.scss'],
    providers: [VALUE_ACCESSOR]
})
export class VatSelectComponent implements OnInit, OnChanges, ControlValueAccessor {

    @Input()
    private disabled: boolean;
    @Input()
    private required: boolean;
    @Input()
    private companyRef: string;

    @Output()
    private vatChanged:EventEmitter<VATModel> = new EventEmitter<VATModel>();

    private vatModelList: Array<VATModel> = [];
    private selectedVat: VATModel;
    private companyService: CompanyService;

    constructor(companyService: CompanyService) {
        this.companyService = companyService;
    }

    ngOnInit() {
        this.initializeVatList();
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.initializeVatList();
    }

    private initializeVatList() {
        const defaultVAT: VATModel = new VATModel();
        defaultVAT.vat = "Taux normal - 20 %";
        defaultVAT.amount = 20;

        if (this.companyRef) {
            this.companyService.fetchCompany(this.companyRef)
                .subscribe(company => {
                    this.vatModelList = company.vats;
                    if (!this.findByVATRate(defaultVAT.amount)) {
                        this.vatModelList.push(defaultVAT);
                    }
                });
        }
    }

    ngChange(_: any) {
    };

    ngTouched(_: any) {
    };

    registerOnChange(fn: any): void {
        this.ngChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.ngTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    writeValue(vat: VATModel): void {
        // Add invoice line vat value in selection list in case it has been removed from customer available vat list.
        if (vat && !this.vatModelList
            .map(vatModel => vatModel.amount)
            .find(amount => amount === vat.amount)) {
            this.vatModelList.push(vat);
        }
        if (vat) {
            this.selectedVat = this.findByVATRate(vat.amount);
        }
    }

    onChange(vatModel: VATModel): void {
        this.selectedVat = vatModel;
        this.vatChanged.emit(vatModel);
    }

    private findByVATRate(rate: number): VATModel {
        return this.vatModelList.find(vatModel => rate === vatModel.amount);
    }


}







