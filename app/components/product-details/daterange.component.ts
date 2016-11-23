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

    public daterange: any = {};

    private selectedDate(value: any) {
        daterange.start = value.start;
        daterange.end = value.end;
    }
}