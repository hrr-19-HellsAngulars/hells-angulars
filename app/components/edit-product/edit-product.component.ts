import { Component, ElementRef, EventEmitter,
         Input, OnInit, Output, ViewChild } from "@angular/core";
import { MapsAPILoader } from "angular2-google-maps/core";
import { FormControl } from "@angular/forms";

import { NewProduct } from "../add_modal/newProduct";
import { EditProductService } from "./edit-product.service";

@Component({
  moduleId: module.id,
  selector: "editproduct-form",
  templateUrl: "edit-product.html",
  styleUrls: [ "edit-product.css" ],
})

export class EditProductForm {
  @Input() product;
  @Output()
  close: EventEmitter<any> = new EventEmitter();

  public selected = 0;
  public hovered = 0;
  public readonly = false;
  public categories = [ "Backpacking", "Bike", "Surf", "Snowboard", "Ski", "SUP", "Kayak" ];
  public searchControl: FormControl;
  public cityState: string = "";
  public lat: number;
  public lng: number;
  public city: string;
  public state: string;
  public zip: number;
  public model = new NewProduct();

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    private editProductService: EditProductService,
    private mapsAPILoader: MapsAPILoader,
  ) { }

  public onSubmit(model: NewProduct) {
    this.editProductService.editProduct(model)
        .then(result => {
          this.close.emit();
        })
        .catch(error => {
          console.log(error);
        });
  }

  ngOnInit(): void {
    this.searchControl = new FormControl();

    // load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"],
      });
      autocomplete.addListener("place_changed", () => {
        // get the place result
        let place: google.maps.places.PlaceResult = autocomplete.getPlace();

        // set latitude and longitude
        this.lat = place.geometry.location.lat();
        this.lng = place.geometry.location.lng();
      });
    });

    this.model.id = this.product.id;
    this.model.productName = this.product.productname;
    this.model.productDescription = this.product.description;
    this.model.pricePerDay = this.product.priceperday;
    this.model.categoryId = this.product.category_id;
    this.model.lat = this.product.lat;
    this.model.lng = this.product.lng;
    this.model.city = this.product.city;
    this.model.state = this.product.state;
    this.cityState = this.product.city + ", " + this.product.state;
    this.model.zip = this.product.zip;
    this.model.userId = this.product.owner_id;
    console.log(this.cityState);
  }

}
