import { Auth }                from "../../auth/auth.service";
import { Component, OnInit, ViewChild, ElementRef }   from "@angular/core";
import { FormGroup, FormControl }           from "@angular/forms";
import { MapsAPILoader }       from "angular2-google-maps/core";

import { AddModalService }     from "../add_modal/addModal.service";
import { ProductsService }     from "../products/products.service";
import { UIROUTER_DIRECTIVES } from "ui-router-ng2";

import { NgbModal, ModalDismissReasons, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";

@Component({
  moduleId: module.id,
  providers: [ Auth ],
  selector: "my-app",
  styleUrls: [ "app.css" ],
  templateUrl: "app.html",
})

export class App {

  title: "Gear Box";
  public closeResult: string;
  public modal: NgbModalRef;
  public content: any;
  public form: FormGroup;
  public searchControl: FormControl;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    private auth: Auth,
    private productsService: ProductsService,
    private addModalService: AddModalService,
    private modalService: NgbModal,
    private mapsAPILoader: MapsAPILoader,
   ) { }

  public onSearch(form: any) {
    this.productsService.keyword = form.value.keyword;
  };

  ngOnInit(): void {
    // checks for user based on profile from Auth0 in localstorage
    this.auth.findOrCreateUser(localStorage.getItem("profile"));


    this.searchControl = new FormControl();

    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["(cities)"],
      });
      autocomplete.addListener("place_changed", () => {
        // get the place result
        let place: google.maps.places.PlaceResult = autocomplete.getPlace();
        console.log(place);
        // set latitude and longitude
        this.latitude = place.geometry.location.lat();
        this.longitude = place.geometry.location.lng();
      });
    });
  }

  public open(content: any) {
    this.addModalService.open(content);
  }

  public close() {
    this.addModalService.close();
  }

}
