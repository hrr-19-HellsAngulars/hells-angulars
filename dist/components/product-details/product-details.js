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
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var stripe_config_1 = require("../../stripe/stripe.config");
var product_details_service_1 = require("./product-details.service");
var ProductDetails = (function () {
    function ProductDetails(config, productDetailsService) {
        this.config = config;
        this.productDetailsService = productDetailsService;
        this.minDate = {
            "year": new Date().getFullYear(),
            "month": +new Date().getMonth() + 1,
            "day": +new Date().getDate(),
        };
        this.oldFromDate = undefined;
        this.oldToDate = undefined;
        this.userId = JSON.parse(localStorage.getItem("profile")).user_id;
        config.max = 5;
        config.readonly = true;
    }
    ProductDetails.prototype.selectedDate = function (value) {
        this.fromDate = value.start;
        this.toDate = value.end;
        var oneDay = 1000 * 60 * 60 * 24;
        // Calculate the difference in milliseconds
        var differenceMs = this.toDate - this.fromDate;
        // this.Convert back to days and return
        var days = Math.round(differenceMs / oneDay);
        this.daysBetween = days;
        this.totalAmount = days * this.product.priceperday;
    };
    ProductDetails.prototype.ngOnInit = function () {
        this.product = this.product[0];
        this.selectedPic = this.product.url[0];
        this.getReviews(this.product.id);
    };
    ProductDetails.prototype.onSelect = function (n) {
        this.selectedPic = this.product.url[n];
    };
    ProductDetails.prototype.getReviews = function (productId) {
        var _this = this;
        this.productDetailsService
            .getReviews(productId)
            .then(function (response) {
            var reviews = response;
            _this.reviews = reviews;
            _this.numberOfReviews = _this.reviews.length;
            var total = _this.reviews.reduce(function (prev, acc) {
                return prev + acc.rating;
            }, 0);
            _this.averageRating = +total / reviews.length;
            console.log(_this.reviews);
        })
            .catch(function (err) { return console.log(err); });
    };
    ProductDetails.prototype.openCheckOut = function () {
        var _this = this;
        console.log(this.product);
        var handler = window.StripeCheckout.configure({
            key: stripe_config_1.stripeConfig.apiKey,
            locale: "auto",
            token: function (token) {
                _this.productDetailsService.charge(token, {
                    amount: _this.totalAmount,
                    buyer_id: _this.userId,
                    seller_id: _this.product.owner_id,
                    status_id: 1,
                    product_id: _this.product.id,
                    bookedfrom: _this.fromDate._d,
                    bookedto: _this.toDate._d,
                });
            },
        });
        handler.open({
            name: "Gear Box",
            amount: +this.totalAmount * 100,
        });
    };
    ProductDetails.prototype.convertObjToDate = function (obj) {
        var date = obj.year + "-" + obj.month + "-" + obj.day;
        return new Date(date);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ProductDetails.prototype, "product", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ProductDetails.prototype, "selectedPic", void 0);
    ProductDetails = __decorate([
        core_1.Component({
            moduleId: module.id,
            providers: [ng_bootstrap_1.NgbRatingConfig],
            selector: "products",
            styleUrls: ["product-details.css"],
            templateUrl: "product-details.html",
        }), 
        __metadata('design:paramtypes', [ng_bootstrap_1.NgbRatingConfig, product_details_service_1.ProductDetailsService])
    ], ProductDetails);
    return ProductDetails;
}());
exports.ProductDetails = ProductDetails;
//# sourceMappingURL=product-details.js.map