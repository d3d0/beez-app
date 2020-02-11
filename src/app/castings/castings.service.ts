import { Injectable, NgZone} from "@angular/core";
import { HttpHeaders, HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, BehaviorSubject, throwError } from "rxjs";
import { localize } from "nativescript-localize";
import { map, catchError, first, retry } from "rxjs/operators";
import { BackendService } from "../shared/backend.service";
import { Casting } from "./casting.model";

@Injectable({
  providedIn: "root"
})

export class CastingsService {
  private _castings: Array<Casting> = [];

  constructor(private http: HttpClient) { }

  private handleErrors(error: Response): Observable<never> {
    if (error.status == 407){
      BackendService.reset()
      return
    }
    return throwError(error);
  }

  /**
   * 
   * load()
   * lista completa di tutti i casting
   */
  load(): Observable<any> {
    console.log('casting loading ...');
    return this.http.get( BackendService.baseUrl + "beez/loool_casting", {
        headers: BackendService.getCommonHeaders()
      }).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleErrors) // then handle the error
      );
  }

  /**
   * 
   * loadAll()
   * lista completa di tutti i casting
   */
  loadAll(): Observable<any> {
    console.log('casting loading ...');
    return this.http.get( BackendService.baseUrl + "beez/loool_all_casting", {
        headers: BackendService.getCommonHeaders()
      }).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleErrors) // then handle the error
      );
  }

  /**
   * 
   * getCastingById()
   * dettaglio di un singolo casting
   */
  getCastingById(id: string): Observable<any> {
    console.log('casting loading ...');
    return this.http.get( BackendService.baseUrl + "beez/loool_casting/"+id, {
        headers: BackendService.getCommonHeaders()
      }).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleErrors) // then handle the error
      );
  }

  cadidate(user_id, casting_id){
    return this.http.post( BackendService.baseUrl + "beez/loool_talentactions/candidate",
      JSON.stringify({
        uid: user_id,
        nid: casting_id
      }),
      { headers: BackendService.getCommonHeaders() })
  }

  partecipate(user_id, casting_id, agency_id, action){
    return this.http.post( BackendService.baseUrl + "beez/loool_talentactions/participate",
      JSON.stringify({
        'uid': user_id,
        'nid': casting_id,
        'agency-tid' : agency_id,
        'op': action
      }),
      {
        headers: BackendService.getCommonHeaders()
      })
  }

}
