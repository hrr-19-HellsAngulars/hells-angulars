import { Component, OnInit, ViewChild, ElementRef }   from "@angular/core";
import { FormControl }         from "@angular/forms";
import { MapsAPILoader }       from "angular2-google-maps/core";
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
  public products: Array<any> = [];
  public markers: Array<any>;
  public latitude: number = 39.8282;
  public longitude: number = -98.5795;
  public zoom: number = 10;
  public searchControl: FormControl;
  public allProducts: Array<any>;
  public minPrice: string;
  public maxPrice: string;
  public searchCategoryId: string = "";

  // Note: This is looking for #search in the HTML template
  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private productsService: ProductsService,
    private config: NgbRatingConfig
  ) {
    config.max = 5;
    config.readonly = true;
  }

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`);
  }

  public getProducts() {
    this.productsService
        .getProductsByQuery()
        .then(response => {
          let products = response.products;
          this.latitude = parseFloat(response.location.lat);
          this.longitude = parseFloat(response.location.lng);
          let allProducts: Array<any> = [];
          this.allProducts = products.slice();
          let productsWithRows: Array<any> = [];
          let row: Array<any> = [];
          for (let i = 0; i < products.length; i++) {
            allProducts.push(products[i]);
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
          this.markers = allProducts;
        });
  }

  public refineSearch(): void {
    this.products = this.allProducts;
    let context = this;
    let products = this.products.filter(function(product: any) {
      return (
        product.priceperday >= parseInt(context.minPrice, 10)
        && product.priceperday <= parseInt(context.maxPrice, 10)
        && (context.searchCategoryId === "" || product.category_id === parseInt(context.searchCategoryId, 10))
        );
     });
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
  }

  public ngOnInit(): void {
    this.getProducts();

    // set current position of map
    // this.setCurrentPosition();

    // load Places Autocomplete
    this.mapsAPILoader.load();
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
      });
    }
  }
}
