import { Injectable, NgZone} from "@angular/core";
import { HttpHeaders, HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, BehaviorSubject, throwError } from "rxjs";
import { localize } from "nativescript-localize";
import { map, catchError, first, retry } from "rxjs/operators";
import { BackendService } from "../../shared/backend.service";


@Injectable({
  providedIn: 'root'
})

export class RecoveryService {

  constructor(private http: HttpClient) { }
  
  private handleErrors(error: Response): Observable<never> {
    if (error.status == 407){
      BackendService.reset()
      return
    }
    return throwError(error);
  }

  recoveryPwd(name){
    return this.http.post( BackendService.baseUrl + "beez/loool/request_new_password",{'name': name },{});
  }

}
