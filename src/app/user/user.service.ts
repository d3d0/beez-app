import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";
import { tap, catchError } from "rxjs/operators";

import { User } from "./user.model";
import { Profile } from "./profile.model";
import { BackendService } from "../shared/backend.service";

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient) { }
  
  login(user: User) {
    return this.http.post(
      BackendService.baseUrl + "beez/user/login",
      JSON.stringify({
        username: user.mail,
        password: user.pass
      }),
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          "x-csrf-token":  BackendService.XCSFRtoken
        })
      })
    }

    logoff() {
      return this.http.post( BackendService.baseUrl + "beez/user/logout",{} ,
      {
        headers: this.getCommonHeader()
      });
    }

  signup(user: User, profile: Profile) {
    return this.http.post(
      BackendService.baseUrl + "beez/loool/register",
      JSON.stringify({
     "mail": user.mail,
     "pass": user.pass,
     "name": user.mail,
     "profile":{
        "field_name":profile.name,
         "field_surname":profile.surname,
         "field_date_of_birth":profile.date_of_birth,
         "field_tutor_name":profile.tutor_name,
         "field_tutor_surname":profile.tutor_surname,
         "field_tutor_date_of_birth":profile.tutor_date_of_birth
       }
      }),
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          "x-csrf-token":  BackendService.XCSFRtoken
        })
      })
    }

    // getProfile() :Profile{
    //   return PROFILE;
    // }

    private getCommonHeader(){
     return new HttpHeaders({
       'Content-Type': 'application/x-www-form-urlencoded',
       'Accept': 'application/json',
       'X-CSRF-Token': BackendService.XCSFRtoken,
       'Cookie': BackendService.session_name + "=" + BackendService.sessid
      })
    }

    getAnonXCSFRtoken(){
      return this.http.get( BackendService.baseUrl + "session/token",
      {
        headers: new HttpHeaders({"Content-Type": "application/json"}),
        responseType: 'text'
      })
    }

  }
