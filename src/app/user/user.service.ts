import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { localize } from "nativescript-localize";

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
      }).pipe( 
      tap(response => {
        if( this.checkRole(response , 'pending user')) {
          throw new Error('pending');
        }
      }),
      catchError(this.handleErrors)
      )
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
          "field_registrato_da_app":{"und":[{"value":1}]},
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

    private handleErrors(error: Response){
      if (error.status == 407){
        BackendService.reset()
        alert(localize("MESSAGES.CONFIRM_EMAIL"));
      }
      return throwError(error);
    }

    private getCommonHeader(){
      return new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'X-CSRF-Token': BackendService.XCSFRtoken,
        'Cookie': BackendService.session_name + "=" + BackendService.sessid
      })
    }

    checkRole(response, role){
      let roles=response['user']['roles']
      let keys
      if (roles) {
        keys = Object.keys(roles)
      }
      return !!keys.filter(key=>roles[key] === role).length
    }

    getAnonXCSFRtoken(){
      return this.http.get( BackendService.baseUrl + "session/token",
      {
        headers: new HttpHeaders({"Content-Type": "application/json"}),
        responseType: 'text'
      })
    }
  }
