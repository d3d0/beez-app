import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { HttpHeaders, HttpClient, HttpErrorResponse } from "@angular/common/http";

import { User } from "../../model/user.model";
import { BackendService } from "./backend.service";

@Injectable()
export class LoginService {
  constructor(private http: HttpClient) { }

  register(user: User) {
    return this.http.post(
      BackendService.baseUrl + "user/",
      JSON.stringify({
        username: user.email,
        email: user.email,
        password: user.password
      }),
      { headers: this.getCommonHeaders() }
    )
    .pipe(catchError(this.handleErrors));
  }

  login(user: User) {
    return this.http.post(
      BackendService.baseUrl + "beez/user/logintoboggan",
      JSON.stringify({
        username: user.email,
        password: user.password
      }),
      { headers: this.getCommonHeaders() }
    )
    .pipe(
      tap((data: any) => {
        BackendService.XCSFRtoken = data._kmd.authtoken;
      }),
      catchError(this.handleErrors)
    );
  }
  logout(user) {
    return this.http.post(
      BackendService.baseUrl + "beez/user/logout",
      JSON.stringify({
        username: user.email,
        password: user.password
      }),
      { headers: this.getCommonHeaders() }
    )
    .pipe(
      tap((data: any) => {
        this.logoff()
      }),
      catchError(this.handleErrors)
    );
  }
  logoff() {
    BackendService.XCSFRtoken = "";
    BackendService.sessid = "";
  }

  resetPassword(email) {
    return this.http.post(
      BackendService.baseUrl + "rpc/",
      {},
      { headers: this.getCommonHeaders() }
    ).pipe(catchError(this.handleErrors));
  }

  private getCommonHeaders() {
    return new HttpHeaders({
      "Content-Type": "application/json"
    });
  }

  private handleErrors(error: HttpErrorResponse) {
    console.log(JSON.stringify(error));
    return throwError(error);
  }
}
