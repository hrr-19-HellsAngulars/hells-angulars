import { Component, OnInit, ViewChild,
  ElementRef }           from "@angular/core";
import { FormControl }   from "@angular/forms";
import { MapsAPILoader } from "angular2-google-maps/core";

@Component({
  moduleId: module.id,
  selector: "google",
  templateUrl: "google.component.html",
  styleUrls: ["google.component.css"],
})

export class Google {

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;

  // Note: This is looking for #search in the HTML template
  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader
  ) { }

  ngOnInit() {
    // set google maps defaults
    this.latitude = 39.8282;
    this.longitude = -98.5795;
    this.zoom = 4;

    // create search FormControl
    this.searchControl = new FormControl();

    // set current position
    this.setCurrentPosition();

    // load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"],
      });
      autocomplete.addListener("place_changed", () => {
        // get the place result
        let place: google.maps.places.PlaceResult = autocomplete.getPlace();
        // set latitude and longitude
        this.latitude = place.geometry.location.lat();
        this.longitude = place.geometry.location.lng();
      });
    });
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
