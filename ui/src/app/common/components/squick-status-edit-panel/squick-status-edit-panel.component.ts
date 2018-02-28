import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {InvoiceModel} from '../../../models/invoice.model';
import {InvoiceStatusType} from '../../../models/invoice-status.type';
import {RepositoryService} from '../../services/repository.service';
import {InvoiceService} from '../../services/invoice.service';

@Component({
    selector: 'squick-status-edit-panel',
    templateUrl: './squick-status-edit-panel.component.html',
    styleUrls: ['./squick-status-edit-panel.component.scss']
})
export class SquickStatusEditPanelComponent implements OnInit {

    public statuses: InvoiceStatusType[];
    @Input() invoice: InvoiceModel;
    @Input() showQuickPanelStatusEdit = false;
    @Output() invoiceUpdate: EventEmitter<InvoiceModel> = new EventEmitter();

    constructor(private repositoryService: RepositoryService,
                private invoiceService: InvoiceService) {
    }

    ngOnInit() {
        this.repositoryService.fetchInvoiceStatus()
            .subscribe(statuses => this.statuses = statuses);
    }

    public updateInvoice() {

        this.invoiceUpdate.emit(this.invoice);
    }

}
