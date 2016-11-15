import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()

export class ProfileService {
  constructor(
    private http: Http
  ){}

  //need to finish this method
  public getProfileInfo(): Promise<any>{
    return Promise.resolve()
  }

}