import { Injectable, NgZone } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { BehaviorSubject, throwError } from "rxjs";
import { map, retry } from "rxjs/operators";
import { BackendService } from "../shared/backend.service";


@Injectable()
export class CounterService {

  constructor(private http: HttpClient) {}

    getCount() {
        return this.http.get(BackendService.baseUrl + 'beez/loool_countnew', {headers: BackendService.getCommonHeaders()});
    }
}
