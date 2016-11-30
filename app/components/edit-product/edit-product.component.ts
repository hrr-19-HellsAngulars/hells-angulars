import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { MapsAPILoader }                 from "angular2-google-maps/core";

import { NewProduct }    from "../add_modal/newProduct";
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

  public model = new NewProduct();

  constructor(
    private editProductService: EditProductService,
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
    this.model.id = this.product.id;
    this.model.productName = this.product.productname;
    this.model.productDescription = this.product.description;
    this.model.pricePerDay = this.product.priceperday;
    this.model.categoryId = this.product.category_id;
  }

}
