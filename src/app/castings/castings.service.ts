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
    private http: HttpClient,
    private _ngZone: NgZone
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
    return new Observable((observer: any) => {
      this._ngZone.run(() => {
        let results = this.http.get(
          BackendService.baseUrl + "beez/loool_casting", {
            headers: this.getCommonHeaders()
          }).pipe(
          ()=> observer.next(results),
          retry(3), // retry a failed request up to 3 times
          catchError(this.handleErrors) // then handle the error
          );

        })
    });
  }

  // load(): Observable<any> {
  //   return new Observable((observer: any) => {

  //     const onValueEvent = (snapshot: any) => {
  //       this._ngZone.run(() => {
  //         const results = this.handleSnapshot(snapshot.value);
  //         observer.next(results);
  //       });
  //     };
  //     firebase.addValueEventListener(onValueEvent, `/${path}`);
  //   }).pipe(catchError(this.handleErrors));
  // }

  private handleErrors(error: Response): Observable<never> {
    if (error.status == 407){
      BackendService.reset()
      return
    }
    return throwError(error);
  }

  getCastingById(id: string): Casting {
    console.log(id)
    if (!id) {
      return;
    }
    return this._castings.filter((casting) => {
      return casting.id === id;
    })[0];
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
      // todoododod
      catchError(this.handleErrors)
      )
    }
  }
