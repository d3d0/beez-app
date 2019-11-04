import { Injectable, NgZone } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { BehaviorSubject, throwError } from "rxjs";
import { map, retry } from "rxjs/operators";
import { BackendService } from "../shared/backend.service";
import { Notification } from "./notification.model";
import { Notifications } from "./notifications.mock";
import { Observable, Subject } from 'rxjs';


@Injectable()
export class NotificationsService {

  // https://jasonwatmore.com/post/2019/02/07/angular-7-communicating-between-components-with-observable-subject
  public counterSubject: Subject<string>;
  public _counter: Observable<string>;

  constructor(private http: HttpClient) {
    this.counterSubject = new Subject();
    this._counter = this.counterSubject.asObservable();
  }

  getCount() {
      return this.http.get(BackendService.baseUrl + 'beez/loool_countnew', {headers: BackendService.getCommonHeaders()});
  }
  load() {
      return this.http.get(BackendService.baseUrl + 'beez/messages-notification', {
        headers: BackendService.getCommonHeaders()
      }).pipe(
        retry(3)
      );
  }
  setRead(mid) {
      return this.http.post( BackendService.baseUrl + "beez/messages-notification/"+mid,
      	{} ,
      {
        headers: BackendService.getCommonHeaders()
      });
  }
  delete(mid) {
      return this.http.post( BackendService.baseUrl + "beez/messages-notification/hide",
      	{
      		"mid":mid
      	} ,
      {
        headers: BackendService.getCommonHeaders()
      });
  }
}
