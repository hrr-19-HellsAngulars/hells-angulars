/* tslint:disable:no-string-literal */
import { ActivatedRoute }           from "@angular/router";
import { AddModalService }          from "../add_modal/addModal.service";
import { Auth }                     from "../../auth/auth.service";
import { Component, Input, OnInit } from "@angular/core";
import { NgbRatingConfig }          from "@ng-bootstrap/ng-bootstrap";
import { stripeConfig }             from "../../stripe/stripe.config";
import { ProductDetailsService }    from "./product-details.service";
import { UIROUTER_DIRECTIVES }      from "ui-router-ng2";
import { UIRouter }                 from "ui-router-ng2";
import { DaterangepickerConfig }    from "./daterangepicker/index";
import { ProfileService }           from "../profile/profile.service";

import * as moment from "moment";

@Component({
  moduleId: module.id,
  providers: [ NgbRatingConfig ],
  selector: "products",
  styleUrls: [ "product-details.css" ],
  templateUrl: "product-details.html",
})

export class ProductDetails implements OnInit {

  @Input() public product: any;

  @Input() public selectedPic: String;

  public selectedReview: any;
  public selectedTransaction: any;
  public user: any;
  public userId: any;

  public context: any = this;
  public formattedDays: Array<any> = [];
  public fromDate: any;
  public invalidDays: Array<any>;
  public prodId: any;
  public toDate: any;

  private averageRating: Number;
  private numberOfReviews: Number;
  private reviews: Array<any>;

  // private oldFromDate: any = undefined;
  // private oldToDate: any = undefined;
  private totalAmount: Number;
  private daysBetween: Number;

  private isInvalidDate: any = undefined;

  constructor(
    private auth: Auth,
    private config: NgbRatingConfig,
    private productDetailsService: ProductDetailsService,
    private uiRouter: UIRouter,
    private drpOptions: DaterangepickerConfig,
    private profileService: ProfileService,
    private addModalService: AddModalService
  ) {
    // get invalid dates from transaction table
    this.prodId = this.uiRouter.globals.params["productId"];
    this.productDetailsService
    .getInvalidDays(this.prodId)
    .then(response => {
      const invalidDates = response;
      this.invalidDays = invalidDates;

    // format invalid days
      let oneDay = 1000 * 60 * 60 * 24;

      for (let i = 0; i < this.invalidDays.length; i++) {
        let from: any = moment(this.invalidDays[i].bookedfrom);
        let to: any = moment(this.invalidDays[i].bookedto);
        let diffMs = to - from;
        let numDays = Math.round(diffMs / oneDay);

        let currentDay = from;

        do {
          this.formattedDays.push(currentDay.format("MM-DD-YYYY"));
          currentDay = currentDay.add(1, "d");
          numDays--;
        } while (numDays > 0);
      }
    });

    config.max = 5;
    config.readonly = true;

    let context = this;

    this.drpOptions.settings = {
      opens: "center",
      minDate: moment(new Date()),
      isInvalidDate: function(date: any) {
        for (let i = 0; i < context.formattedDays.length; i++) {
          if (date.format("MM-DD-YYYY") === context.formattedDays[i]) {
            return true;
          }
        }
      },
    };
  }

  public ngOnInit() {
    this.product = this.product[0];
    this.selectedPic = this.product.url[0];
    this.getReviews(this.product.id);
    this.getUserIdFromProfile();
    // this.getUserInfo();
  }

// Product Details Methods

  public selectedDate(value: any) {
    this.fromDate = value.start.format("YYYY-MM-DD");
    this.toDate = value.end.format("YYYY-MM-DD");

    let oneDay = 1000 * 60 * 60 * 24;
    // Calculate the difference in milliseconds
    let differenceMs: any = (<any> moment)(this.toDate) - (<any> moment)(this.fromDate);

    // this.Convert back to days and return
    let days = Math.round(differenceMs / oneDay);
    this.daysBetween = days;
    this.totalAmount = days * this.product.priceperday;
  }

  public onSelect(n: number) {
    this.selectedPic = this.product.url[n];
  }

  public getReviews(productId: number) {
    this.productDetailsService
      .getReviews(productId)
      .then(response => {
        const reviews = response;
        this.reviews = reviews;
        this.numberOfReviews = this.reviews.length;
        let total = this.reviews.reduce((prev, acc) => {
          return prev + acc.rating;
        }, 0);
        this.averageRating =  +total / reviews.length;
        console.log(this.reviews);
      })
      .catch(err => console.log(err));
  }

  public openCheckOut() {
    if (this.auth.authenticated()) {
      let handler = (<any> window).StripeCheckout.configure({
        key: stripeConfig.apiKey,
        locale: "auto",
        token: (token: any) => {
          this.productDetailsService.charge(token, {
            amount: this.totalAmount,
            buyer_id: JSON.parse(localStorage.getItem("profile")).user_id,
            seller_id: this.product.owner_id,
            status_id: 1,
            product_id: this.product.id,
            bookedfrom: this.fromDate,
            bookedto: this.toDate,
          });
        },
      });
      handler.open({
        name: "Gear Box",
        amount: +this.totalAmount * 100,
      });
    } else {
      this.auth.login();
    }
  }

  public convertObjToDate(obj: any) {
    let date = obj.year + "-" + obj.month + "-" + obj.day;
    return new Date(date);
  }

  public getUserIdFromProfile() {
    if (localStorage.getItem("profile")) {
      this.userId = JSON.parse(localStorage.getItem("profile")).user_id;
      this.getUserInfo();
    } else {
      return;
    }
  }

  public getUserInfo() {
    console.log(this.userId);
    this.profileService
      .getUserInfo(this.userId)
      .then(response => {
        const user = JSON.parse(response._body);
        this.user = user;
        console.log(user);
      })
      .catch(err => console.log(err));
  }

  public open(content: any) {
    this.addModalService.open(content);
  }

  public onSelectReview(review: any) {
    this.selectedReview = review;
  }

  public close() {
    this.addModalService.close();
    this.getReviews(this.product.id);
  }
}
