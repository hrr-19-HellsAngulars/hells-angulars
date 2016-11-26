"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var config_service_1 = require('./config.service');
var $ = require('jquery');
require('bootstrap-daterangepicker');
var DaterangePickerComponent = (function () {
    function DaterangePickerComponent(input, config) {
        this.input = input;
        this.config = config;
        this.options = {};
        this.selected = new core_1.EventEmitter();
    }
    DaterangePickerComponent.prototype.ngAfterViewInit = function () {
        // $('head').append('<style>'+require('./daterangepicker.css')+'</style>');
        // $('head').append('<style> rel="stylesheet" href="./app/components/product-detail/daterangepicker/daterangepicker.css" type="text/css" </style>');
        var targetOptions = Object.assign({}, this.config.settings, this.options);
        $(this.input.nativeElement).daterangepicker(targetOptions, this.callback.bind(this));
    };
    DaterangePickerComponent.prototype.callback = function (start, end) {
        var obj = {
            start: start,
            end: end
        };
        this.selected.emit(obj);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], DaterangePickerComponent.prototype, "options", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DaterangePickerComponent.prototype, "selected", void 0);
    DaterangePickerComponent = __decorate([
        core_1.Directive({
            //moduleId: module.id,
            selector: '[daterangepicker]',
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, config_service_1.DaterangepickerConfig])
    ], DaterangePickerComponent);
    return DaterangePickerComponent;
}());
exports.DaterangePickerComponent = DaterangePickerComponent;
//# sourceMappingURL=daterangepicker.component.js.map