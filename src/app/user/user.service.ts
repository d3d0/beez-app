import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";
import { tap, catchError } from "rxjs/operators";

import { User } from "./user.model";
import { USER } from "./user.mocks";
import { Profile } from "./profile.model";
import { PROFILE } from "./profile.mocks";
import { BackendService } from "../shared/backend.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  
  getUser() :User{
    return USER;
  }
  getProfile() :Profile{
    return PROFILE;
  }

  login(user: User) {
  	BackendService.getAnonXCSFRtoken()
    return this.http.post(
      BackendService.baseUrl + "user/",
      JSON.stringify({
        username: user.email,
        password: user.password
      }),
      { headers: this.getCommonHeaders() }
    )
    .pipe(
      tap((data: any) => {
		console.log(data)
      }),
      catchError(this.handleErrors)
    );
  }

  logoff() {
    BackendService.logoff();
  }

  private getCommonHeaders() {
    return new HttpHeaders({
      "Content-Type": "application/json",
    });
  }

  private handleErrors(error: HttpErrorResponse) {
    console.log(JSON.stringify(error));
    return throwError(error);
  }


}
