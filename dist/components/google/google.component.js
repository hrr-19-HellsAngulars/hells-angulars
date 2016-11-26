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
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var core_2 = require("angular2-google-maps/core");
var Google = (function () {
    function Google(mapsAPILoader) {
        this.mapsAPILoader = mapsAPILoader;
    }
    Google.prototype.ngOnInit = function () {
        var _this = this;
        // set google maps defaults
        this.zoom = 4;
        this.latitude = 39.8282;
        this.longitude = -98.5795;
        // create search FormControl
        this.searchControl = new forms_1.FormControl();
        // set current position
        this.setCurrentPosition();
        // load Places Autocomplete
        this.mapsAPILoader.load().then(function () {
            var autocomplete = new google.maps.places.Autocomplete(_this.searchElementRef.nativeElement, {
                types: ["address"],
            });
            autocomplete.addListener("place_changed", function () {
                // get the place result
                var place = autocomplete.getPlace();
                console.log(place);
                // set latitude and longitude
                _this.latitude = place.geometry.location.lat();
                _this.longitude = place.geometry.location.lng();
            });
        });
    };
    Google.prototype.setCurrentPosition = function () {
        var _this = this;
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                _this.latitude = position.coords.latitude;
                _this.longitude = position.coords.longitude;
                _this.zoom = 12;
            });
        }
    };
    __decorate([
        core_1.ViewChild("search"), 
        __metadata('design:type', core_1.ElementRef)
    ], Google.prototype, "searchElementRef", void 0);
    Google = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "google",
            templateUrl: "google.component.html",
            styleUrls: ["google.component.css"],
        }), 
        __metadata('design:paramtypes', [core_2.MapsAPILoader])
    ], Google);
    return Google;
}());
exports.Google = Google;
//# sourceMappingURL=google.component.js.map