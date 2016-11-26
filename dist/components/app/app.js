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
var auth_service_1 = require("../../auth/auth.service");
var core_1 = require("@angular/core");
var addModal_service_1 = require("../add_modal/addModal.service");
var products_service_1 = require("../products/products.service");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var App = (function () {
    function App(auth, productsService, addModalService, modalService) {
        this.auth = auth;
        this.productsService = productsService;
        this.addModalService = addModalService;
        this.modalService = modalService;
    }
    App.prototype.onSearch = function (form) {
        this.productsService.keyword = form.value.keyword;
    };
    ;
    App.prototype.ngOnInit = function () {
        // checks for user based on profile from Auth0 in localstorage
        this.auth.findOrCreateUser(localStorage.getItem("profile"));
    };
    App.prototype.open = function (content) {
        this.addModalService.open(content);
    };
    App.prototype.close = function () {
        this.addModalService.close();
    };
    App = __decorate([
        core_1.Component({
            moduleId: module.id,
            providers: [auth_service_1.Auth],
            selector: "my-app",
            styleUrls: ["app.css"],
            templateUrl: "app.html",
        }), 
        __metadata('design:paramtypes', [auth_service_1.Auth, products_service_1.ProductsService, addModal_service_1.AddModalService, ng_bootstrap_1.NgbModal])
    ], App);
    return App;
}());
exports.App = App;
//# sourceMappingURL=app.js.map