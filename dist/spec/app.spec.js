"use strict";
var testing_1 = require("@angular/core/testing");
var app_1 = require("../components/app/app");
describe("Gear Box Application", function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [
                app_1.App,
            ],
        });
    });
    it("should create the app", testing_1.async(function () {
        var fixture = testing_1.TestBed.createComponent(app_1.App);
        var app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
});
//# sourceMappingURL=app.spec.js.map