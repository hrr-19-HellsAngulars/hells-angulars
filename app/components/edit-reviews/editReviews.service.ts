import { Headers, Http } from "@angular/http";
import { Injectable }    from "@angular/core";
import { NewReview }    from "../add-review/newReview";

import "rxjs/add/operator/toPromise";

@Injectable()
export class EditReviewService {

  public headers: Headers = new Headers({
  "Content-Type": "application/json",
  Accept: "application/json",
  });

  constructor(private http: Http) { }

  // edits  a review in the database
  public updateReview(newReview: NewReview, id: number): Promise<any> {
    let requestBody = {review: newReview, id: id};
    return this.http.post("/api/reviews", requestBody, { headers: this.headers })
    .toPromise()
    .then(res => res)
    .catch(this.handleError);
  }

  public deleteReview(id: number): Promise<any> {
    console.log('lets begin');
    let url = "/api/reviews/" + id;
    let requestBody = {id: id}
    return this.http.post(url, requestBody, { headers: this.headers })
    .toPromise()
    .then(res => res)
    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
