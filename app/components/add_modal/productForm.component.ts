import { amazonS3Config }                from "../../auth/amazonS3.config";
import { Component, OnInit, ViewChild, Output,
  EventEmitter, ElementRef }             from "@angular/core";
import { FormControl }                   from "@angular/forms";
import { MapsAPILoader }                 from "angular2-google-maps/core";

import { NewProduct }                    from "./newProduct";
import { NewProductService }             from "./newProduct.service";

declare const AWS: any;

@Component({
  moduleId: module.id,
  selector: "newprod-form",
  templateUrl: "newProd-form.component.html",
  styleUrls: [ "newProd-form.css" ],
})

export class NewProductForm {
  @Output()
  close: EventEmitter<any> = new EventEmitter();

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  public categories = [ "Backpacking", "Bike", "Surf", "Snowboard", "Ski", "SUP", "Kayak" ];
  public model: any = new NewProduct();
  public place: any;

  // Note: This is looking for #search in the HTML template
  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    private newProductService: NewProductService,
    private mapsAPILoader: MapsAPILoader
  ) { }

  public upload(fileInput: any) {
    let context = this;
    let AWSService = (<any> window).AWS;
    let pictures = [
      fileInput.target.files[0],
      fileInput.target.files[1],
      fileInput.target.files[2],
      fileInput.target.files[3],
    ];
    AWSService.config.accessKeyId = amazonS3Config.accessKeyId;
    AWSService.config.secretAccessKey = amazonS3Config.secretAccessKey;
    let bucket = new AWSService.S3({params: {Bucket: "gear-box"}});
    pictures.forEach((pic: any, index: number) => {
      if (pic !== undefined) {
        let params = {Key: pic.name, Body: pic};
        bucket.upload(params, function (error: any, result: any) {
          if (error) { console.log(error); };
          let thisImageLink: any = "imageLink" + index;
          context.model[thisImageLink] = result.Location;
        });
      }
    });
  }

  public onSubmit(model: NewProduct) {
    model.lat = this.place.geometry.location.lat().toFixed(7);
    model.lng = this.place.geometry.location.lng().toFixed(7);

    // this block parses out the address_components and gets out what we need.
    // It's needed because the address_components array sort is not stable.
    this.place.address_components.forEach(component => {
      component.types.forEach(type => {
        if (type === "locality") {
          model.city = component.long_name;
        }
        if (type === "administrative_area_level_1") {
          model.state = component.short_name;
        }
        if (type === "postal_code") {
          model.zip = component.long_name;
        }
      });
    });

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

    // load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"],
      });
      autocomplete.addListener("place_changed", () => {
        // get the place result
        let place: google.maps.places.PlaceResult = autocomplete.getPlace();
        this.place = place;

        // set latitude and longitude
        this.latitude = place.geometry.location.lat();
        this.longitude = place.geometry.location.lng();
      });
    });
  }
}
