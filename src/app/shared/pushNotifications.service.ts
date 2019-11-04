import { Injectable } from "@angular/core";
import { HttpClient  } from "@angular/common/http";
import { localize } from "nativescript-localize";
import { retry } from "rxjs/operators";
import { isAndroid } from "tns-core-modules/platform";
import { BackendService } from "../shared/backend.service";

@Injectable({
  providedIn: "root"
})

export class PushNotificationsService {

  constructor( private http: HttpClient ) { }

  push_token(token) {
    return this.http.post(
      BackendService.baseUrl + 'beez/fcm_token',
      JSON.stringify({
        token: token,
        platform: isAndroid ? 'android' : 'ios',
        language: localize('LANG').toLowerCase()
      }),
      {
        headers: BackendService.getCommonHeaders()
      }).pipe(
      retry(3)
      )
  }

}
