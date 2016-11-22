import { Component, OnInit } from '@angular/core';
import { DaterangepickerConfig } from './daterangepicker/index';

import * as moment from 'moment';

@Component({
    moduleId: module.id,
    selector: 'gb-date-range',
    templateUrl: './daterange.component.html',
    styleUrls: ['./daterange.component.css']
})
export class DateRangeComponent implements OnInit{

    public dateInputs: any = [
        {
            start: moment().subtract(12, 'month'),
            end: moment().subtract(6, 'month')
        },
    ];

    constructor(private daterangepickerOptions: DaterangepickerConfig) {
        this.daterangepickerOptions.settings = {
            locale: { format: 'YYYY-MM-DD' },
            alwaysShowCalendars: false,
            ranges: {
               'Last Month': [moment().subtract(1, 'month'), moment()],
               'Last 3 Months': [moment().subtract(4, 'month'), moment()],
               'Last 6 Months': [moment().subtract(6, 'month'), moment()],
               'Last 12 Months': [moment().subtract(12, 'month'), moment()],
            }
        };
    }

    ngOnInit() {}

    private selectedDate(value: any, dateInput: any) {
        dateInput.start = value.start;
        dateInput.end = value.end;
    }

}