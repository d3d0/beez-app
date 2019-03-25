import { Injectable, NgZone} from "@angular/core";
import { HttpHeaders, HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, BehaviorSubject, throwError } from "rxjs";
import { localize } from "nativescript-localize";
import { map, catchError, first, retry } from "rxjs/operators";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { filter } from 'rxjs/operators';

import { BackendService } from "../shared/backend.service";
const DICTIONARIES = require('../../assets/dictionaries.json');

interface Term {
  vid:string;
  tid:string;
  name:string;
}

@Injectable({
  providedIn: "root"
})

export class TaxonomyService {
  private terms: BehaviorSubject<Array<Term>> = new BehaviorSubject([]);
  allTerms:Term[] =[];
  private serviceURl = localize('LANG') === 'IT' ? BackendService.term_ita : BackendService.term_eng

  constructor( private http: HttpClient, private zone:NgZone ) {}

  load(vocabolary){
      let dict =  DICTIONARIES[vocabolary]
     return this.http.get(
      BackendService.baseUrl + this.serviceURl, {
        headers: BackendService.getCommonHeaders()
      }).pipe(
      retry(3), // retry a failed request up to 3 times 
      map((data: Term[]) => {
        this.allTerms = data.filter(el => el.vid == dict),
        this.publishUpdates();
      }),
      catchError(this.handleErrors)
      )
    }

    getVocabolary(vocabolary){
      let dict =  DICTIONARIES[vocabolary]
      if (typeof dict =='number' )
        return this.load
      else
        return dict
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
