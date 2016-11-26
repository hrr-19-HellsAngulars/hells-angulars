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
var core_2 = require("angular2-google-maps/core");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var products_service_1 = require("./products.service");
var Products = (function () {
    function Products(mapsAPILoader, productsService, config) {
        this.mapsAPILoader = mapsAPILoader;
        this.productsService = productsService;
        this.config = config;
        this.lat = -37.7863713;
        this.lng = 175.2796333;
        this.zoom = 4;
        this.markers = [
            {
                place: "ChIJJ1XCysTQmoARU9qxtqimyiE",
                draggable: false,
            },
            {
                place: "ChIJtaxkMdvQmoARA8Diy_MifCo",
                draggable: false,
            },
        ];
        config.max = 5;
        config.readonly = true;
    }
    Products.prototype.clickedMarker = function (label, index) {
        console.log("clicked the marker: " + (label || index));
    };
    Products.prototype.getProducts = function () {
        var _this = this;
        this.productsService
            .getProductsByQuery()
            .then(function (products) {
            // Rearrange products to have 3 products in one row
            var productsWithRows = [];
            var row = [];
            for (var i = 0; i < products.length; i++) {
                if (i % 3 === 0 && row.length > 0) {
                    productsWithRows.push(row);
                    row = [];
                }
                row.push(products[i]);
                if (i === products.length - 1) {
                    productsWithRows.push(row);
                }
            }
            _this.products = productsWithRows;
            console.log(_this.products);
        });
    };
    Products.prototype.ngOnInit = function () {
        this.getProducts();
        // set google maps defaults
        // this.zoom = 4;
        // this.latitude = 39.8282;
        // this.longitude = -98.5795;
        // create search FormControl
        // this.searchControl = new FormControl();
        // set current position
        // this.setCurrentPosition();
        // load Places Autocomplete
        // this.mapsAPILoader.load()
    };
    __decorate([
        core_1.ViewChild("search"), 
        __metadata('design:type', core_1.ElementRef)
    ], Products.prototype, "searchElementRef", void 0);
    Products = __decorate([
        core_1.Component({
            moduleId: module.id,
            providers: [ng_bootstrap_1.NgbRatingConfig],
            selector: "products",
            styleUrls: ["products.css"],
            templateUrl: "products.html",
        }), 
        __metadata('design:paramtypes', [core_2.MapsAPILoader, products_service_1.ProductsService, ng_bootstrap_1.NgbRatingConfig])
    ], Products);
    return Products;
}());
exports.Products = Products;
//# sourceMappingURL=products.js.map