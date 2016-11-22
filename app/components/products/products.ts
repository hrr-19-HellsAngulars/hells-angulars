import { Component, OnInit }   from "@angular/core";
import { NgbRatingConfig }     from "@ng-bootstrap/ng-bootstrap";
import { ProductsService }     from "./products.service";
import { UIROUTER_DIRECTIVES } from "ui-router-ng2";

@Component({
  moduleId: module.id,
  providers: [ NgbRatingConfig ],
  selector: "products",
  styleUrls: [ "products.css" ],
  templateUrl: "products.html",
})

export class Products implements OnInit {
  public products: Array<any>;

  constructor(
    private productsService: ProductsService,
    private config: NgbRatingConfig
  ) {
    config.max = 5;
    config.readonly = true;
  }

  public getProducts() {
    this.productsService
        .getProductsByQuery()
        .then(products => {
          // Rearrange products to have 3 products in one row
          let productsWithRows: Array<any> = [];
          let row: Array<any> = [];
          for (let i = 0; i < products.length; i++) {
            if (i % 3 === 0 && row.length > 0) {
              productsWithRows.push(row);
              row = [];
            }
            row.push(products[i]);
            if (i === products.length - 1) {
              productsWithRows.push(row);
            }
          }
          this.products = productsWithRows;
        });
  }

  public ngOnInit(): void {
    this.getProducts();
  }
}
