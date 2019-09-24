import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {InvoiceModel} from '../../../models/invoice.model';
import {InvoiceStatusType} from '../../../models/invoice-status.type';
import {RepositoryService} from '../../services/repository.service';

@Component({
    selector: 'quick-status-edit-panel',
    templateUrl: './quick-status-edit-panel.component.html',
    styleUrls: ['./quick-status-edit-panel.component.scss']
})
export class QuickStatusEditPanelComponent implements OnInit {

    public statuses: InvoiceStatusType[];
    @Input() invoice: InvoiceModel;
    @Input() showQuickPanelStatusEdit = false;
    @Output() invoiceUpdate: EventEmitter<InvoiceModel> = new EventEmitter();

    constructor(private repositoryService: RepositoryService) {
    }

    ngOnInit() {
        this.repositoryService.fetchInvoiceStatus()
            .subscribe(statuses => this.statuses = statuses);
    }

    public updateInvoice(): void {
        this.invoiceUpdate.emit(this.invoice);
    }

}
