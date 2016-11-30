import { Headers, Http } from "@angular/http";
import { Injectable }    from "@angular/core";
import { NewProduct }    from "../add_modal/newProduct";

import "rxjs/add/operator/toPromise";

@Injectable()
export class EditProductService {

  public headers: Headers = new Headers({
  "Content-Type": "application/json",
  Accept: "application/json",
  });

  constructor(private http: Http) { }

  // sends PUT request to server to update an existing product
  public editProduct(product: NewProduct): Promise<any> {
    return this.http.put("/api/products/" + product.id, product, { headers: this.headers })
    .toPromise()
    .then(res => res)
    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
