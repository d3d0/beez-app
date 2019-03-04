import { Injectable, NgZone } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { BehaviorSubject, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { BackendService } from "../shared";
import { Notification } from "./notification.model";
import { Notifications } from "./notifications.mock";


@Injectable()
export class NotificationsService {

  constructor(private http: HttpClient) {}

  load() {
    return this.http.get(BackendService.baseUrl + 'beez/messages-notification', {
      headers: BackendService.getCommonHeaders()
    })
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