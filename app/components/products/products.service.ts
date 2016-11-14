import { Injectable } from '@angular/core';
import { Headers, Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Data } from '../../data/dummydata';

@Injectable()

export class ProductsService {
  constructor(
    private http: Http
  ){}

  public getProducts(): Promise<any>{
    return Promise.resolve(Data)
    // TBD, UNCOMMENT FOLLING LINES AFTER BACKEND ROUTE SETUP
    // return this.http.get('/api/products')
    //               .toPromise()
    //               .then(response => response.json())
    //               .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}

