import { Injectable } from "@angular/core";
import { Headers, Http} from "@angular/http";

import "rxjs/add/operator/toPromise";

import { Data } from "../../data/dummydata";

@Injectable()

export class ProductsService {
  keyword: string;
  lat: number;
  lng: number;

  constructor(
    private http: Http
  ) {}

  public getProducts(): Promise<any> {
    // return Promise.resolve(Data);
    return this.http.get("/api/products")
                  .toPromise()
                  .then(response => response.json())
                  .catch(this.handleError);
  }

  public getProductsByQuery(): Promise<any> {
    let url = "/api/products/search?query=" + this.keyword;
    return this.http.get(url)
                    .toPromise()
                    .then(response => response.json())
                    .catch(this.handleError);
  }

   public getImages(productId): Promise<any> {
    return this.http.get(`/api/products/images/${productId}`)
    .toPromise()
    .then(response => {
      return response;
    })
    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
