import { Injectable, NgZone} from "@angular/core";
import { HttpHeaders, HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, BehaviorSubject, throwError } from "rxjs";
import { localize } from "nativescript-localize";
import { map, catchError, first, retry } from "rxjs/operators";
import { BackendService } from "../../shared/backend.service";


@Injectable({
  providedIn: 'root'
})

export class PasswordService {

  constructor(private http: HttpClient) { }
  
  private handleErrors(error: Response): Observable<never> {
    if (error.status == 407){
      BackendService.reset()
      return
    }
    return throwError(error);
  }


  updatePwd(form){

    return this.http.post( BackendService.baseUrl + "beez/loool_talent_profile/passupdate",
      JSON.stringify({
        uid: form.uid,
        pass: form.pwd,
        currentpwd:form.currentpwd
      }),
      { headers: BackendService.getCommonHeaders() })
  }
  
  updateMail(form){
    return this.http.post( BackendService.baseUrl + "beez/loool_talent_profile/email_notify_update",
      JSON.stringify({
        uid: form.uid,
        email_notify: form.email_notify
      }),
      { headers: BackendService.getCommonHeaders() })
  }


  
  


}
