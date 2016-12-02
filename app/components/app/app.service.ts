import { Data }          from "../../data/dummydata";
import { Http, Headers } from "@angular/http";
import { Injectable }    from "@angular/core";

import "rxjs/add/operator/toPromise";

@Injectable()

export class AppService {
  public headers: Headers = new Headers({
  "Content-Type": "application/json",
  Accept: "application/json",
  });

  constructor(
    private http: Http
  ) {}

  public getCityState(url: any) {
    return this.http.get(url)
        .toPromise()
        .then(response => response.json())
        .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
