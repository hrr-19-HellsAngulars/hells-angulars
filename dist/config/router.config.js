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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require("@angular/core");
var ui_router_ng2_1 = require("ui-router-ng2");
/** UIRouter Config  */
var MyUIRouterConfig = (function () {
    function MyUIRouterConfig(router) {
        // If no URL matches, go to the `home` state by default
        router.urlRouterProvider.otherwise(function ($injector, $location) { return JSON.stringify(router.stateService.go("home")); });
    }
    MyUIRouterConfig = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(ui_router_ng2_1.UIRouter)), 
        __metadata('design:paramtypes', [ui_router_ng2_1.UIRouter])
    ], MyUIRouterConfig);
    return MyUIRouterConfig;
}());
exports.MyUIRouterConfig = MyUIRouterConfig;
//# sourceMappingURL=router.config.js.map