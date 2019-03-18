import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, BehaviorSubject, throwError } from "rxjs";
import { localize } from "nativescript-localize";
import { map, catchError, first, retry } from "rxjs/operators";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { isAndroid } from "tns-core-modules/platform";

import { filter } from 'rxjs/operators';

import { BackendService } from "../shared/backend.service";

@Injectable({
  providedIn: "root"
})

export class PushNotificationsService {

  constructor( private http: HttpClient ) { }

  push_token(token) {
    console.log(      JSON.stringify({
        token: token,
        platform: isAndroid ? 'android' : 'ios',
        language: localize('LANG').toLowerCase
      }))
    return this.http.post(
      BackendService.baseUrl + 'beez/fcm_token',
      JSON.stringify({
        token: token,
        platform: isAndroid ? 'android' : 'ios',
        language: localize('LANG').toLowerCase
      }),
      {
        headers: BackendService.getCommonHeaders()
      })
  }

}
