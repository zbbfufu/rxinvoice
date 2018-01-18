import {Component, Input, OnInit} from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';

@Component({
    selector: 'address-input',
    templateUrl: './address-input.component.html',
    styleUrls: ['./address-input.component.scss'],
    viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ]
})
export class AddressInputComponent implements OnInit {

    @Input() editMode: boolean;

    constructor() {

    }

    ngOnInit() {
    }
}
