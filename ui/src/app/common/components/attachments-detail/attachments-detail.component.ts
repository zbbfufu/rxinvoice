import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BlobModel} from '../../../models/blob.model';

@Component({
    selector: 'attachments-detail',
    templateUrl: './attachments-detail.component.html',
    styleUrls: ['./attachments-detail.component.scss']
})
export class AttachmentsDetailComponent implements OnInit {

    @Input() attachments: BlobModel[];
    @Input() editMode: boolean;
    @Output() vatsChange: EventEmitter<BlobModel[]> = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
        if (!this.attachments) { this.attachments = []; }
    }

    addAttachment() {

    }

    delete(fileToRemove) {
        this.attachments = this.attachments.filter(file => fileToRemove !== file);
    }

}
