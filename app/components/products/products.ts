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
  public products: Array<any>;
  public markers: Array<any>;
  public lat: number = -37.7863713;
  public lng: number = 175.2796333;
  public searchControl: FormControl;
  public zoom: number = 4;

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
        .then(products => {
          // Rearrange products to have 3 products in one row
          let allProducts: Array<any> = [];
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

  public ngOnInit(): void {
    this.getProducts();

    // set google maps defaults
    this.zoom = 15;
    this.latitude = -39.8282;
    this.longitude = 111.5795;

    // set current position
    this.setCurrentPosition();

    // load Places Autocomplete
    this.mapsAPILoader.load()
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }
}
