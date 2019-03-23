import { Injectable, NgZone} from "@angular/core";
import { HttpHeaders, HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, BehaviorSubject, throwError } from "rxjs";
import { localize } from "nativescript-localize";
import { map, catchError, first, retry } from "rxjs/operators";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { filter } from 'rxjs/operators';

import { BackendService } from "../shared/backend.service";
const DICTIONARIES = require('../../assets/dictionaries.json');

@Injectable({
  providedIn: "root"
})

export class TaxonomyService {
  terms: BehaviorSubject<Array<any>> = new BehaviorSubject([]);
  allTerms =[];
  // private _allTerms = new ObservableArray();
  private serviceURl

  constructor( private http: HttpClient, private zone:NgZone ) {
    this.serviceURl = localize('LANG') === 'IT' ? BackendService.term_ita : BackendService.term_eng
    this.load()
  }

  load(): Observable<any> {
    return this.http.get(
      BackendService.baseUrl + this.serviceURl, {
        headers: BackendService.getCommonHeaders()
      }).pipe(
      retry(3), // retry a failed request up to 3 times 
      map((data: any[]) => {
        this.allTerms = data.sort((a, b) => a.name.localeCompare(b.name)),
        this.publishUpdates()
      }),
      catchError(this.handleErrors)
      )
    }

    getVocabolary(vocabolary){
      if (typeof DICTIONARIES[vocabolary] != 'string' ) 
        return DICTIONARIES[vocabolary]
      else
        return this.allTerms.filter(el => el['vid'] == DICTIONARIES[vocabolary])
    }
    
    getNameValue(tid){
      return this.allTerms.filter(el => el.tid == tid)
    }

    private publishUpdates() {
      this.zone.run(() => {
        this.terms.next([...this.allTerms]);
      });
    }
    
    private handleErrors(error: Response): Observable<never> {
      return throwError(error);
    }
  }
