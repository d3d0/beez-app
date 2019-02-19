import { Injectable, NgZone} from "@angular/core";
import { HttpHeaders, HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, BehaviorSubject, throwError } from "rxjs";
import { localize } from "nativescript-localize";
import { map, catchError, first, retry } from "rxjs/operators";
import { BackendService } from "../shared/backend.service";
import { Casting } from "./casting.model";
import { alert } from "../shared";

@Injectable({
  providedIn: "root"
})

export class CastingsService {
  private _castings: Array<Casting> = [];

  constructor(
    private http: HttpClient
    ) {}

  private getCommonHeaders(){
    return  new HttpHeaders({
      'Content-Type': "application/json",
      'Accept': 'application/json',
      'Cache-Control': 'no-cache',
      'x-csrf-token': BackendService.XCSFRtoken,
      'Cookie': BackendService.session_name + "=" + BackendService.sessid
    })
  }

  load(): Observable<any> {
    return this.http.get(
      BackendService.baseUrl + "beez/loool_casting", {
        headers: this.getCommonHeaders()
      }).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleErrors) // then handle the error
    );
  }

  private handleErrors(error: Response): Observable<never> {
          console.log('this.handleErrors', error)

    if (error.status == 407){
      BackendService.reset()
      return
    }
    return throwError(error);
  }

  getCastingById(id: string): Observable<any> {
    return this.http.get(

      BackendService.baseUrl + "beez/loool_casting/"+id, {
        headers: this.getCommonHeaders()
      }).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleErrors) // then handle the error
    );
  }

  cadidate(user_id, casting_id){
    return this.http.post(
      BackendService.baseUrl + "beez/loool_talentactions/candidate",
      JSON.stringify({
        uid: user_id,
        nid: casting_id
      }),
      { headers: this.getCommonHeaders() }
      ).pipe(
        catchError(this.handleErrors)
      )
    }
  }
