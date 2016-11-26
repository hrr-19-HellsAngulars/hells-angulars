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
require("rxjs/add/operator/toPromise");
var angular2_jwt_1 = require("angular2-jwt");
var http_1 = require("@angular/http");
var core_1 = require("@angular/core");
var ProfileService = (function () {
    function ProfileService(http, authHttp) {
        this.http = http;
        this.authHttp = authHttp;
    }
    ProfileService.prototype.getUserInfo = function (authId) {
        return this.authHttp.get("/api/users/" + authId)
            .toPromise()
            .then(function (response) {
            return response;
        })
            .catch(this.handleError);
    };
    ProfileService.prototype.getUserProducts = function (userId) {
        userId = JSON.stringify(userId);
        return this.http.get("/api/products/byuser/" + userId)
            .toPromise()
            .then(function (response) {
            return response;
        })
            .catch(this.handleError);
    };
    ProfileService.prototype.getUserRentals = function (userId) {
        userId = JSON.stringify(userId);
        return this.http.get("/api/transactions/buyer/" + userId)
            .toPromise()
            .then(function (response) {
            return response;
        })
            .catch(this.handleError);
    };
    ProfileService.prototype.getUserTransactions = function (userId) {
        userId = JSON.stringify(userId);
        return this.http.get("/api/transactions/seller/" + userId)
            .toPromise()
            .then(function (response) {
            return response;
        })
            .catch(this.handleError);
    };
    // public getUserRatingAsBuyer(): Promise<any> {
    // }
    // public getUserRatingAsSeller(): Promise<any> {
    //  }
    ProfileService.prototype.getImages = function (productId) {
        return this.http.get("/api/products/images/" + productId)
            .toPromise()
            .then(function (response) {
            return response;
        })
            .catch(this.handleError);
    };
    ProfileService.prototype.handleError = function (error) {
        return Promise.reject(error.message || error);
    };
    ProfileService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, angular2_jwt_1.AuthHttp])
    ], ProfileService);
    return ProfileService;
}());
exports.ProfileService = ProfileService;
;
//# sourceMappingURL=profile.service.js.map