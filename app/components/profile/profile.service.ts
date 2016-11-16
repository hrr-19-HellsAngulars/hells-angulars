import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { UserData } from '../../data/dummyusers';

@Injectable()

export class ProfileService {
  constructor(
    private http: Http
  ){}

  //need to write this for when the DB is populated
  public getUserInfo(): Promise<any>{
    console.log("getUserInfo from service fired")
    return Promise.resolve(UserData)
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}