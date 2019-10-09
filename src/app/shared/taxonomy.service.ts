import { Injectable, NgZone} from "@angular/core";
import { HttpHeaders, HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, from, BehaviorSubject, throwError } from "rxjs";
import { localize } from "nativescript-localize";
import { map,filter, catchError, last, retry } from "rxjs/operators";
import { ObservableArray } from "tns-core-modules/data/observable-array";

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
  private allTerms
  private subscription
  private serviceURl = localize('LANG') === 'IT' ? BackendService.term_ita : BackendService.term_eng
  
  constructor( private http: HttpClient, private zone:NgZone ) {
    this.load().subscribe(()=>{},(err)=>console.log('err TaxonomyService: ', err))
    console.log('hello from TaxonomyService')
    /// default value for signin form (no auth)
    this.terms = new BehaviorSubject(DICTIONARIES['GENDERS']);
  }
  
  load(){
    return this.http.get(
      BackendService.baseUrl + this.serviceURl, {
        headers: BackendService.getCommonHeaders()
      }).pipe(
      map((data: any[]) => {
        data.sort((a, b) => (a.name > b.name) ? 1 : -1)
        this.allTerms = data
        this.publishUpdates();
      }),
      catchError(this.handleErrors)
      );
    }

    private publishUpdates() {
      console.log('update TaxonomyService')
      this.zone.run(() => {
        // add the genders statics options
        this.allTerms = this.allTerms.concat(DICTIONARIES['GENDERS'])
        this.terms.next([...this.allTerms]);
      });
    }

    getVocabolary(vocabolary){
      let vid =  DICTIONARIES[vocabolary]
      if (typeof vid !='number' ) vid = vocabolary
      return this.terms.pipe(map( data => data.filter((el:Term)=>el.vid == vid)))
    }

    getTerm(tid){
        return this.terms.pipe(map( data => data.filter((el:Term)=>el.tid == tid)))
    }
    
    private handleErrors(error: Response): Observable<never> {
      return throwError(error);
    }
  }
