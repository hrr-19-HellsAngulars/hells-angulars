import {
  Component, OnInit, ViewChild, Output, EventEmitter, ElementRef,
}                                        from "@angular/core";
import { FormControl }                   from "@angular/forms";
import { MapsAPILoader }                 from "angular2-google-maps/core";

import { NewProduct }        from "./newProduct";
import { NewProductService } from "./newProduct.service";

@Component({
  moduleId: module.id,
  selector: "newprod-form",
  templateUrl: "newProd-form.component.html",
  styleUrls: ["newProd-form.css"],
})

export class NewProductForm {
  @Output()
  close: EventEmitter<any> = new EventEmitter();

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  public categories = [ "Backpacking", "Bike", "Surf", "Snowboard", "Ski", "SUP", "Kayak" ];
  public model = new NewProduct();
  public place: any;

  // Note: This is looking for #search in the HTML template
  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    private newProductService: NewProductService,
    private mapsAPILoader: MapsAPILoader
  ) { }

  public onSubmit(model: NewProduct) {
    model.placeId = this.place.place_id;
    model.lat = this.place.geometry.location.lat().toFixed(7);
    console.log(model.lat);
    model.lng = this.place.geometry.location.lng().toFixed(7);
    model.city = this.place.address_components[1].long_name;
    model.state = this.place.address_components[3].short_name;
    if (this.place.address_components[5] !== undefined) {
      model.zip = this.place.address_components[5].long_name;
    }

    model.userId = JSON.parse(localStorage.getItem("profile")).user_id;
    this.newProductService.postProduct(model)
        .then(result => {
          this.close.emit();
        })
        .catch(error => {
          console.log(error);
        });
  };

  ngOnInit() {
    // create search FormControl
    this.searchControl = new FormControl();

    // //set current position
    // this.setCurrentPosition();

    // load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"],
      });
      autocomplete.addListener("place_changed", () => {
        // get the place result
        let place: google.maps.places.PlaceResult = autocomplete.getPlace();
        this.place = place;
        console.log(place);

        // set latitude and longitude
        this.latitude = place.geometry.location.lat();
        this.longitude = place.geometry.location.lng();
      });
    });
  }

  // private setCurrentPosition() {
  //   if ("geolocation" in navigator) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       this.latitude = position.coords.latitude;
  //       this.longitude = position.coords.longitude;
  //       this.zoom = 12;
  //     });
  //   }
  // }
}
