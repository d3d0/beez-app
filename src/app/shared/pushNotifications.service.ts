import { Injectable, NgZone} from "@angular/core";
import { HttpHeaders, HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, BehaviorSubject, throwError } from "rxjs";
import { localize } from "nativescript-localize";
import { map, catchError, first, retry } from "rxjs/operators";
import { BackendService } from "../shared/backend.service";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { filter } from 'rxjs/operators';


@Injectable({
  providedIn: "root"
})

export class PushNotificationsService {


  constructor( private http: HttpClient, private zone:NgZone ) {}

  push_token(token) {
    return this.http.post(
      BackendService.baseUrl + 'beez/fcm_token',
      JSON.stringify({
        token: token,
        platform: 'android',
        language: 'en'
      }),
      {
        headers: BackendService.getCommonHeaders()
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
  }
