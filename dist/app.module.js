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
/* tslint:disable:max-line-length */
require("rxjs/add/operator/map");
require("rxjs/add/operator/toPromise");
var angular2_jwt_1 = require("angular2-jwt");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var core_1 = require("@angular/core");
var ui_router_ng2_1 = require("ui-router-ng2");
var index_1 = require("./components/product-details/daterangepicker/index");
var add_review_1 = require("./components/add-review/add-review");
var core_2 = require("angular2-google-maps/core");
var about_js_1 = require("./components/about/about.js");
var app_js_1 = require("./components/app/app.js");
var google_component_1 = require("./components/google/google.component");
var home_js_1 = require("./components/home/home.js");
var productForm_component_1 = require("./components/add_modal/productForm.component");
var products_1 = require("./components/products/products");
var product_details_1 = require("./components/product-details/product-details");
var profile_component_1 = require("./components/profile/profile.component");
var daterange_component_1 = require("./components/product-details/daterange.component");
var googleMaps_config_1 = require("./auth/googleMaps.config");
var addModal_service_1 = require("./components/add_modal/addModal.service");
var add_review_service_1 = require("./components/add-review/add-review.service");
var newProduct_service_1 = require("./components/add_modal/newProduct.service");
var products_service_1 = require("./components/products/products.service");
var product_details_service_1 = require("./components/product-details/product-details.service");
var profile_service_1 = require("./components/profile/profile.service");
var router_config_js_1 = require("./config/router.config.js");
var states_js_1 = require("./states.js");
var INITIAL_COMPONENTS = [
    app_js_1.App, about_js_1.About, add_review_1.AddReviewForm, google_component_1.Google, home_js_1.Home, products_1.Products, product_details_1.ProductDetails, profile_component_1.ProfileComponent, productForm_component_1.NewProductForm, daterange_component_1.DateRangeComponent
];
var INITIAL_PROVIDERS = [
    addModal_service_1.AddModalService, add_review_service_1.AddReviewService, products_service_1.ProductsService, profile_service_1.ProfileService, product_details_service_1.ProductDetailsService, angular2_jwt_1.AUTH_PROVIDERS, newProduct_service_1.NewProductService,
];
var INITIAL_STATES = [
    states_js_1.aboutState, states_js_1.googleState, states_js_1.homeState, states_js_1.productsState, states_js_1.productDetailsState, states_js_1.profileState, states_js_1.searchState,
];
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                core_2.AgmCoreModule.forRoot({
                    apiKey: googleMaps_config_1.GOOGLE_API_KEY,
                    libraries: ["places"],
                }),
                platform_browser_1.BrowserModule,
                index_1.Daterangepicker,
                forms_1.FormsModule,
                http_1.HttpModule,
                http_1.JsonpModule,
                ng_bootstrap_1.NgbModule.forRoot(),
                forms_1.ReactiveFormsModule,
                ui_router_ng2_1.UIRouterModule.forRoot({
                    configClass: router_config_js_1.MyUIRouterConfig,
                    states: INITIAL_STATES,
                    useHash: true,
                }),
            ],
            declarations: INITIAL_COMPONENTS,
            providers: INITIAL_PROVIDERS,
            bootstrap: [app_js_1.App],
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map