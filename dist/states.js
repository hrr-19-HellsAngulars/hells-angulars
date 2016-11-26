"use strict";
var about_1 = require("./components/about/about");
var google_component_1 = require("./components/google/google.component");
var home_1 = require("./components/home/home");
var products_1 = require("./components/products/products");
var product_details_1 = require("./components/product-details/product-details");
var product_details_service_1 = require("./components/product-details/product-details.service");
var profile_component_1 = require("./components/profile/profile.component");
var ui_router_ng2_1 = require("ui-router-ng2");
/** States */
exports.googleState = {
    component: google_component_1.Google,
    name: "google",
    url: "/google",
};
exports.homeState = {
    component: home_1.Home,
    name: "home",
    url: "/",
};
exports.aboutState = {
    component: about_1.About,
    name: "about",
    url: "/about",
};
exports.productsState = {
    component: products_1.Products,
    name: "products",
    url: "/products",
};
exports.productDetailsState = {
    component: product_details_1.ProductDetails,
    name: "productDetails",
    url: "/product/:productId",
    resolve: [
        {
            token: "product",
            deps: [ui_router_ng2_1.Transition, product_details_service_1.ProductDetailsService],
            resolveFn: function (trans, productDetailsSvc) { return productDetailsSvc.getProductDetails(trans.params().productId); },
        },
    ],
};
exports.profileState = {
    component: profile_component_1.ProfileComponent,
    name: "profile",
    url: "/profile",
};
exports.searchState = {
    component: products_1.Products,
    name: "products-search",
    url: "/products/search",
};
//# sourceMappingURL=states.js.map