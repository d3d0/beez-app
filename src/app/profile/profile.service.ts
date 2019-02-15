import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";
import { tap, catchError } from "rxjs/operators";

import { Profile } from "../user/profile.model";
import { BackendService } from "../shared/backend.service";

@Injectable({
  providedIn: 'root'
})

export class ProfileService {
  
  constructor(private http: HttpClient) { }

  getProfile() {
    return new Profile()
    }

    getAnonXCSFRtoken(){
      this.http.get( BackendService.baseUrl + "session/token",
      {
        headers: new HttpHeaders({"Content-Type": "application/json"}),
        responseType: 'text'
      }).subscribe((result) => {
        BackendService.XCSFRtoken = result;
        // console.log('getAnonXCSFRtoken ',result);
      }, (error) => {
        console.log('getAnonXCSFRtoken error: ',error);
      });
    }

    logoff() {
      return this.http.post( BackendService.baseUrl + "beez/user/logout",
      {
        headers: new HttpHeaders({
        "x-csrf-token":  BackendService.XCSFRtoken,
        "session": BackendService.session_name + "=" + BackendService.sessid
      })
      });
    }

    private getCommonHeader(){
     return new HttpHeaders({
        "Content-Type": "application/json",
      })
    }
}
