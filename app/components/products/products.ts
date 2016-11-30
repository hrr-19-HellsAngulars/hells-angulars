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
  public minPrice: string = "0";
  public maxPrice: string = "500";
  public searchCategoryId: string = "";
  public searchRadius: number = 50; // miles
  public availableFrom: any;
  public availableTo: any;

  // Note: This is looking for #search in the HTML template
  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    public activeTransactions: Array<any>,
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

  public getActiveTransactions() {
    this.productsService
        .getActiveTransactions()
        .then(transactions => {
          let activeTransactions: Array<any> = [];
          // an array of all active transactions
          this.activeTransactions = transactions.slice();
          console.log(this.activeTransactions);

          // vv Filtering the activeTransactions array to only contain correct dates vv
          // for each active transaction
            // if all dates within the selection range are not within the booked range
              // remove this transaction from the array because it is available when needed

          // this.activeTransactions.filter(function(transaction) {
          //   transaction.bookedfrom = transaction.bookedfrom.substr(0, 10);
          //   transaction.bookedto = transaction.bookedto.substr(0, 10);
          // });
          for (let i = 0; i < this.activeTransactions.length; i++) {
            this.activeTransactions[i] = this.activeTransactions[i].product_id;
          }
        });
  }

  public getProducts() {
    let context = this;
    this.productsService
        .getProductsByQuery()
        .then(response => {
          let products = response.products;
          this.latitude = parseFloat(response.location.lat);
          this.longitude = parseFloat(response.location.lng);
          // Rearrange products to have 3 products in one row
          products = products.filter(function(product: any) {
            return !context.activeTransactions.includes(product.id);
          });
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
        && (
          context.haversineDistance(
              [context.latitude, context.longitude], [product.lat, product.lng], true
            ) <= context.searchRadius
          )
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

  public haversineDistance(coords1: number[], coords2: number[], isMiles: boolean) {
    function toRad(x: number): number {
      return x * Math.PI / 180;
    }

    let lat1: number = coords1[0];
    let lon1: number = coords1[1];

    let lat2: number = coords2[0];
    let lon2: number = coords2[1];

    let R: number = 6371; // earth radius in km

    let x1 = lat2 - lat1;
    let dLat = toRad(x1);
    let x2 = lon2 - lon1;
    let dLon = toRad(x2);
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;

    if (isMiles) {
      d /= 1.60934;
    }

    return d;
  }

  public ngOnInit(): void {
    this.getActiveTransactions();
    this.getProducts();

    // if map center is still default, attempt to set center to user's current location
    // if (this.latitude === 39.8282 && this.longitude === -98.5795) {
    //   this.setCurrentPosition();
    // }

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
