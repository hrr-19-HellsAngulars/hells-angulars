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
var profile_service_1 = require("./profile.service");
var addModal_service_1 = require("../add_modal/addModal.service");
var ProfileComponent = (function () {
    function ProfileComponent(profileService, addModalService) {
        this.profileService = profileService;
        this.addModalService = addModalService;
    }
    ProfileComponent.prototype.getUserIdFromProfile = function () {
        this.userId = JSON.parse(localStorage.getItem("profile")).user_id;
    };
    ProfileComponent.prototype.getUserInfo = function () {
        var _this = this;
        this.profileService
            .getUserInfo(this.userId)
            .then(function (response) {
            var user = JSON.parse(response._body);
            _this.user = user;
            _this.stripeAccount = user.stripeaccountid;
            _this.getUserProducts(_this.user.id);
            _this.getUserRentals(_this.user.id);
            _this.getUserTransactions(_this.user.id);
        })
            .catch(function (err) { return console.log(err); });
    };
    ProfileComponent.prototype.getUserProducts = function (userId) {
        var _this = this;
        this.profileService
            .getUserProducts(userId)
            .then(function (response) {
            var products = JSON.parse(response._body);
            _this.products = products;
        })
            .catch(function (err) { return console.log(err); });
    };
    ProfileComponent.prototype.getUserTransactions = function (userId) {
        var _this = this;
        this.profileService
            .getUserTransactions(userId)
            .then(function (response) {
            var transactions = JSON.parse(response._body);
            _this.transactions = transactions;
            _this.completedTransactions = transactions.filter(function (transaction) {
                return transaction.status_id === 2;
            });
            _this.getAvailableFunds();
        })
            .catch(function (err) { return console.log(err); });
    };
    ProfileComponent.prototype.getUserRentals = function (userId) {
        var _this = this;
        this.profileService
            .getUserRentals(userId)
            .then(function (response) {
            var rentals = JSON.parse(response._body);
            _this.rentals = rentals;
            console.log(_this.rentals);
        })
            .catch(function (err) { return console.log(err); });
    };
    ProfileComponent.prototype.getAvailableFunds = function () {
        var funds = 0;
        this.completedTransactions.forEach(function (transaction) {
            funds += transaction.totalValue;
        });
        this.availableFunds = funds;
    };
    ProfileComponent.prototype.ngOnInit = function () {
        this.getUserIdFromProfile();
        this.getUserInfo();
    };
    ProfileComponent.prototype.onSelect = function (rental) {
        this.selectedTransaction = rental;
    };
    ProfileComponent.prototype.open = function (content) {
        this.addModalService.open(content);
    };
    ProfileComponent.prototype.close = function () {
        this.addModalService.close();
        this.getUserInfo();
    };
    ProfileComponent.prototype.convertDate = function (date) {
        return date.slice(0, 10);
    };
    ProfileComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "profile",
            styleUrls: ["profile.component.css"],
            templateUrl: "profile.component.html",
        }), 
        __metadata('design:paramtypes', [profile_service_1.ProfileService, addModal_service_1.AddModalService])
    ], ProfileComponent);
    return ProfileComponent;
}());
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=profile.component.js.map