import {Component, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import * as moment from 'moment';
import {DatePickerComponent} from 'ng2-date-picker';
import {FormControl} from '@angular/forms';

@Component({
    selector: 'date-picker',
    templateUrl: './date-picker.component.html',
    styleUrls: ['./date-picker.component.scss']
})
export class InDatePickerComponent implements OnChanges {

    @Input() control: FormControl;
    @Input() disabled = false;
    @Input() initDate = false;
    @Input() utcMode = false;
    @Input() allowClear = true;

    @ViewChild('picker') datePicker: DatePickerComponent;
    config = {format: 'DD/MM/YYYY', locale: 'fr', firstDayOfWeek: 'mo'};

    dateMoment:  moment.Moment;

    private readonly nativeDateFormat = 'YYYY-MM-DD';

    constructor() {
    }

    ngOnChanges(changes: SimpleChanges): void {
        const control = changes['control'];
        if (control
            && !!control.currentValue.value
            && control.currentValue.value !== ''
            && control.currentValue.value !== undefined
            && (control.previousValue ? control.currentValue.value !== control.previousValue.value : true)) {
            this.dateMoment = moment(control.currentValue.value);
        }
        if (control && control.firstChange && this.initDate) {
            const startDate = moment().subtract(7, 'days');
            this.dateMoment = moment(startDate);
        }
    }

    public onDateChange(date: any) {
        if (date) {
            const string = this.utcMode ?  moment(date).utc() : moment(date).format(this.nativeDateFormat);
            this.control.setValue(string);
        } else {
            this.control.setValue('');
        }

    }

    public clearInput() {
        this.dateMoment = undefined;
        this.datePicker.writeValue(undefined);
        this.control.setValue('');
    }
}
