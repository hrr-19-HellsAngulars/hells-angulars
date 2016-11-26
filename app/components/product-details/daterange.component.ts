import { Component } from '@angular/core';
import { DaterangepickerConfig } from './daterangepicker/index';

import * as moment from 'moment';

@Component({
    moduleId: module.id,
    selector: 'gb-date-range',
    templateUrl: './daterange.component.html',
    styleUrls: ['./daterange.component.css']
})
export class DateRangeComponent {

    public daterange: any = {};

    private selectedDate(value: any) {
        this.daterange.start = value.start;
        this.daterange.end = value.end;
    }
}