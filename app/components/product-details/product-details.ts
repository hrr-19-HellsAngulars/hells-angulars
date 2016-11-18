import { ActivatedRoute }           from "@angular/router";
import { Component, Input, OnInit } from "@angular/core";
import { NgbRatingConfig }          from "@ng-bootstrap/ng-bootstrap";
import { ProductDetailsService }    from "./product-details.service";
import { UIROUTER_DIRECTIVES }      from "ui-router-ng2";

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

  constructor(
    private config: NgbRatingConfig
  ) {
    config.max = 5;
    config.readonly = true;
  }

  public ngOnInit() {
    this.selectedPic = this.product.pic[0];
    console.log(this.selectedPic);
  }

  public onSelect(n: number) {
    this.selectedPic = this.product.pic[n];
  }

}
