import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";
import { tap, retry } from "rxjs/operators";

import { Profile } from "../user/profile.model";
import { BackendService } from "../shared/backend.service";

@Injectable({
  providedIn: 'root'
})

export class ProfileService {

  constructor(private http: HttpClient) {
    console.log('BackendService.UID ',BackendService.UID)
  }

  load() {
    return this.http.get(BackendService.baseUrl + 'beez/loool_talent_profile/'+ BackendService.UID, {
      headers: BackendService.getCommonHeaders()
    }).pipe(
      retry(3)
      );
  }

  edit(mid) {
      return this.http.post( BackendService.baseUrl + "beez/messages-notification/hide",
        {
          "mid":mid
        } ,
      {
        headers: BackendService.getCommonHeaders()
      });
  }
}
