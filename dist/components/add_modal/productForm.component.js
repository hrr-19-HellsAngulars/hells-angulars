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
var newProduct_1 = require("./newProduct");
var newProduct_service_1 = require("./newProduct.service");
var NewProductForm = (function () {
    function NewProductForm(newProductService, mapsAPILoader) {
        this.newProductService = newProductService;
        this.mapsAPILoader = mapsAPILoader;
        this.close = new core_1.EventEmitter();
        this.categories = ["Backpacking", "Bike", "Surf", "Snowboard", "Ski", "SUP", "Kayak"];
        this.model = new newProduct_1.NewProduct();
    }
    NewProductForm.prototype.onSubmit = function (model) {
        var _this = this;
        model.lat = this.place.geometry.location.lat().toFixed(7);
        model.lng = this.place.geometry.location.lng().toFixed(7);
        // this block parses out the address_components and gets out what we need.
        // It's needed because the address_components array sort is not stable.
        this.place.address_components.forEach(function (component) {
            component.types.forEach(function (type) {
                if (type === "locality") {
                    model.city = component.long_name;
                }
                if (type === "administrative_area_level_1") {
                    model.state = component.short_name;
                }
                if (type === "postal_code") {
                    model.zip = component.long_name;
                }
            });
        });
        // for (const i = 0; i < this.place.address_components.length; i++) {
        //   for (const j = 0; j < this.place.address_components[i].types.length; j++) {
        //     if (this.place.address_components[i].types[j] === "locality") {
        //       model.city = this.place.address_components[i].long_name;
        //     }
        //     if (this.place.address_components[i].types[j] === "administrative_area_level_1") {
        //       model.state = this.place.address_components[i].short_name;
        //     }
        //     if (this.place.address_components[i].types[j] === "postal_code") {
        //       model.zip = this.place.address_components[i].long_name;
        //     }
        //   }
        // }
        model.userId = JSON.parse(localStorage.getItem("profile")).user_id;
        this.newProductService.postProduct(model)
            .then(function (result) {
            _this.close.emit();
        })
            .catch(function (error) {
            console.log(error);
        });
    };
    ;
    NewProductForm.prototype.ngOnInit = function () {
        var _this = this;
        // create search FormControl
        this.searchControl = new forms_1.FormControl();
        // //set current position
        // this.setCurrentPosition();
        // load Places Autocomplete
        this.mapsAPILoader.load().then(function () {
            var autocomplete = new google.maps.places.Autocomplete(_this.searchElementRef.nativeElement, {
                types: ["address"],
            });
            autocomplete.addListener("place_changed", function () {
                // get the place result
                var place = autocomplete.getPlace();
                _this.place = place;
                console.log(place);
                // set latitude and longitude
                _this.latitude = place.geometry.location.lat();
                _this.longitude = place.geometry.location.lng();
            });
        });
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], NewProductForm.prototype, "close", void 0);
    __decorate([
        core_1.ViewChild("search"), 
        __metadata('design:type', core_1.ElementRef)
    ], NewProductForm.prototype, "searchElementRef", void 0);
    NewProductForm = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "newprod-form",
            templateUrl: "newProd-form.component.html",
            styleUrls: ["newProd-form.css"],
        }), 
        __metadata('design:paramtypes', [newProduct_service_1.NewProductService, core_2.MapsAPILoader])
    ], NewProductForm);
    return NewProductForm;
}());
exports.NewProductForm = NewProductForm;
//# sourceMappingURL=productForm.component.js.map