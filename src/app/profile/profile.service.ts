import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";
import { tap, catchError } from "rxjs/operators";

import { Profile } from "./profile.model";
import { BackendService } from "../shared/backend.service";

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient) { }

  getProfile(user: User) {
    this.getAnonXCSFRtoken()
    return this.http.post(
      BackendService.baseUrl + "beez/user/login",
      JSON.stringify({
        username: user.email,
        password: user.password
      }),
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          "X-CSRF-Token":  BackendService.XCSFRtoken
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
        console.log('getAnonXCSFRtoken ',result);
      }, (error) => {
        console.log(error);
      });
    }

    logoff() {
      return this.http.post( BackendService.baseUrl + "beez/user/logout",
      {
        headers:        new HttpHeaders({
        "X-CSRF-Token":  BackendService.XCSFRtoken,
        "session": BackendService.session_name + "=" + BackendService.sessid,
         this.getCommonHeader()

      });
      });
    }

    // getUser() :User{
    //   return this.user;
    // }
    private getCommonHeader(){
     let h =  new HttpHeaders({
        "Content-Type": "application/json",

      })
     console.log(h)
     console.log("getCommonHeader")
     return h
    }
}
