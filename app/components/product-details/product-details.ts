import { ActivatedRoute }           from "@angular/router";
import { Component, Input, OnInit } from "@angular/core";
import { NgbRatingConfig }          from "@ng-bootstrap/ng-bootstrap";
import { stripeConfig }        from "../../stripe/stripe.config.js";
import { ProductDetailsService }    from "./product-details.service";
import { UIROUTER_DIRECTIVES }      from "ui-router-ng2";
import { DaterangepickerConfig }      from "./daterangepicker/index";

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

  public fromDate: any;
  public toDate: any;

  private minDate: any = {
    "year": new Date().getFullYear(),
    "month": +new Date().getMonth() + 1,
    "day": +new Date().getDate(),
  };

  private reviews: Array<any>;
  private numberOfReviews: Number;
  private averageRating: Number;

  private oldFromDate: any = undefined;
  private oldToDate: any = undefined;
  private totalAmount: Number;
  private daysBetween: Number;

  private userId = JSON.parse(localStorage.getItem("profile")).user_id;

  constructor(
    private config: NgbRatingConfig,
    private productDetailsService: ProductDetailsService
  ) {
    config.max = 5;
    config.readonly = true;
  }

  public selectedDate(value: any) {
    this.fromDate = value.start;
    this.toDate = value.end;

    let oneDay = 1000 * 60 * 60 * 24;

    // Calculate the difference in milliseconds
    let differenceMs = this.toDate - this.fromDate;

    // this.Convert back to days and return
    let days = Math.round(differenceMs / oneDay);
    this.daysBetween = days;
    this.totalAmount = days * this.product.priceperday;
  }

  public ngOnInit() {
    this.product = this.product[0];
    this.selectedPic = this.product.url[0];
    this.getReviews(this.product.id);
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
    console.log(this.product);
    let handler = (<any> window).StripeCheckout.configure({
      key: stripeConfig.apiKey,
      locale: "auto",
      token: (token: any) => {
        this.productDetailsService.charge(token, {
          amount: this.totalAmount,
          buyer_id: this.userId,
          seller_id: this.product.owner_id,
          status_id: 1,
          product_id: this.product.id,
          bookedfrom: this.fromDate._d,
          bookedto: this.toDate._d,
        });
      },
    });

    handler.open({
      name: "Gear Box",
      amount: +this.totalAmount * 100,
    });

  }

  public convertObjToDate(obj: any) {
    let date = obj.year + "-" + obj.month + "-" + obj.day;
    return new Date(date);
  }
}
