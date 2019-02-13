import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";
import { tap, catchError } from "rxjs/operators";

import { User } from "./user.model";
import { Profile } from "./profile.model";
import { PROFILE } from "./profile.mocks";
import { BackendService } from "../shared/backend.service";

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient) { }
  
  login(user: User) {
    this.getAnonXCSFRtoken()
    return this.http.post(
      BackendService.baseUrl + "beez/user/login",
      JSON.stringify({
        username: user.email,
        password: user.pass
      }),
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          "x-csrf-token":  BackendService.XCSFRtoken
        })
      })
    }

    getAnonXCSFRtoken(){
      this.http.get( BackendService.baseUrl + "session/token",
      {
        headers: new HttpHeaders({"Content-Type": "application/json"}),
        responseType: 'text'
      }).subscribe((result) => {
        BackendService.XCSFRtoken = result;
      }, (error) => {
        console.log('getAnonXCSFRtoken error: ',error);
      });
    }

    logoff() {
      return this.http.post( BackendService.baseUrl + "beez/user/logout",{} ,
      {
        headers: new HttpHeaders({
       'Content-Type': 'application/x-www-form-urlencoded',
       'Accept': 'application/json',
       'X-CSRF-Token': BackendService.XCSFRtoken,
       'session': BackendService.session_name + "=" + BackendService.sessid
      })
      })
    }

    private getCommonHeader(){
     let h =  new HttpHeaders({
        "Content-Type": "application/json",
      })
     return h
    }

    getProfile() :Profile{
      return PROFILE;
    }
  }
