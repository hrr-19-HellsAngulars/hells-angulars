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
var newReview_1 = require("./newReview");
var add_review_service_1 = require("./add-review.service");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var AddReviewForm = (function () {
    function AddReviewForm(addReivewService, config) {
        this.addReivewService = addReivewService;
        this.config = config;
        this.close = new core_1.EventEmitter();
        this.selected = 0;
        this.hovered = 0;
        this.readonly = false;
        this.model = new newReview_1.NewReview();
        config.max = 5;
    }
    AddReviewForm.prototype.onSubmit = function (model) {
        var _this = this;
        model.authorId = this.userId;
        model.transactionId = this.transaction.id;
        model.productId = this.transaction.product_id;
        model.buyerId = this.transaction.buyer_id;
        model.sellerId = this.transaction.seller_id;
        model.rating = this.selected;
        this.addReivewService.addReivew(model)
            .then(function (result) {
            _this.close.emit();
        })
            .catch(function (error) {
            console.log(error);
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AddReviewForm.prototype, "transaction", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AddReviewForm.prototype, "userId", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], AddReviewForm.prototype, "close", void 0);
    AddReviewForm = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "addreview-form",
            templateUrl: "add-review.html",
            styleUrls: ["add-review.css"],
            providers: [ng_bootstrap_1.NgbRatingConfig],
        }), 
        __metadata('design:paramtypes', [add_review_service_1.AddReviewService, ng_bootstrap_1.NgbRatingConfig])
    ], AddReviewForm);
    return AddReviewForm;
}());
exports.AddReviewForm = AddReviewForm;
//# sourceMappingURL=add-review.js.map