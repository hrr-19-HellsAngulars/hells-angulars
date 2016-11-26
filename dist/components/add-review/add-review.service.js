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
var http_1 = require("@angular/http");
var core_1 = require("@angular/core");
require("rxjs/add/operator/toPromise");
var AddReviewService = (function () {
    function AddReviewService(http) {
        this.http = http;
        this.headers = new http_1.Headers({
            "Content-Type": "application/json",
            Accept: "application/json",
        });
    }
    // adds a review to the database
    AddReviewService.prototype.addReivew = function (newReview) {
        return this.http.post("/api/reviews", newReview, { headers: this.headers })
            .toPromise()
            .then(function (res) { return res; })
            .catch(this.handleError);
    };
    AddReviewService.prototype.handleError = function (error) {
        return Promise.reject(error.message || error);
    };
    AddReviewService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AddReviewService);
    return AddReviewService;
}());
exports.AddReviewService = AddReviewService;
//# sourceMappingURL=add-review.service.js.map