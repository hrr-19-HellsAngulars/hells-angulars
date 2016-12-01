import "rxjs/add/operator/toPromise";
import { AuthHttp }      from "angular2-jwt";
import { Data, Rentals } from "../../data/dummydata";
import { Http, Headers }          from "@angular/http";
import { Injectable }    from "@angular/core";
import { UserData }      from "../../data/dummyusers";

@Injectable()
export class ProfileService {
    public headers: Headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
     });
  constructor(
    private http: Http,
    private authHttp: AuthHttp,
  ) {}

  public getUserInfo(authId): Promise<any> {
    return this.authHttp.get(`/api/users/${authId}`)
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.handleError);
  }

  public getUserProducts(userId): Promise<any> {
    userId = JSON.stringify(userId);
    return this.http.get(`/api/products/byuser/${userId}`)
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.handleError);
  }

  public getUserRentals(userId): Promise<any> {
    userId = JSON.stringify(userId);
    return this.http.get(`/api/transactions/buyer/${userId}`)
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.handleError);
  }

  public getUserTransactions(userId): Promise<any> {
    userId = JSON.stringify(userId);
    return this.http.get(`/api/transactions/seller/${userId}`)
      .toPromise()
      .then(response => {
        return response;
      })
      .catch(this.handleError);
  }

  // public getUserRatingAsBuyer(): Promise<any> {

  // }

  // public getUserRatingAsSeller(): Promise<any> {

//  }

  public getImages(productId: number): Promise<any> {
    return this.http.get(`/api/products/images/${productId}`)
    .toPromise()
    .then(response => {
      return response;
    })
    .catch(this.handleError);
  }

  public closeTransaction(id: number): Promise<any> {
    let requestBody = {status_id: 2};
    return this.http.put(`/api/transactions/${id}`, requestBody, {headers: this.headers})
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

};
