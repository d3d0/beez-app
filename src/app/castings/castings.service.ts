import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";
import { tap, catchError } from "rxjs/operators";

import { BackendService } from "../shared/backend.service";

import { Casting } from "./casting.model";
import { CASTINGS } from "./castings.mock";

@Injectable()
export class CastingsService {
 
  constructor(private http: HttpClient) { }
  
  getCastings() :any{
    return this.http.get( BackendService.baseUrl + "beez/loool_casting",
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          "x-csrf-token":  BackendService.XCSFRtoken,
          "session": BackendService.session_name + "=" + BackendService.sessid
        })
       }).subscribe((result) => {
        console.log('getCastings ',result);
      }, (error) => {
        console.log(error);
      });
  }

  getCarById(id: string) :Casting{
        if (!id) {
            return;
        }

        return CASTINGS.filter((car) => {
            return car.id === id;
        })[0];
    }

 //   return this.http.get(this.baseUrl, {
  //     headers: this.getCommonHeaders()
  //   })
  //   .pipe(
  //     map((data: any[]) => {
  //       this.allItems = data
  //         .sort((a, b) => {
  //           return a._kmd.lmt > b._kmd.lmt ? -1 : 1;
  //         })
  //         .map(
  //           grocery => new Grocery(
  //             grocery._id,
  //             grocery.Name,
  //             grocery.Done || false,
  //             grocery.Deleted || false
  //         )
  //       );
  //       this.publishUpdates();
  //     }),
  //     catchError(this.handleErrors)
  //   );
  // }

    // load() {
    //     console.log('load')
    //     return CASTINGS;
    // }


  // load() {
  //   return this.http.get(this.baseUrl, {
  //     headers: this.getCommonHeaders()
  //   })
  //   .pipe(
  //     map((data: any[]) => {
  //       this.allItems = data
  //         .sort((a, b) => {
  //           return a._kmd.lmt > b._kmd.lmt ? -1 : 1;
  //         })
  //         .map(
  //           casting => new Casting(
  //             casting._id,
  //             casting.Name,
  //             casting.Done || false,
  //             casting.Deleted || false
  //         )
  //       );
  //       this.publishUpdates();
  //     }),
  //     catchError(this.handleErrors)
  //   );
  // }

  // add(name: string) {
  //   return this.http.post(
  //     this.baseUrl,
  //     JSON.stringify({ Name: name }),
  //     { headers: this.getCommonHeaders() }
  //   )
  //   .pipe(
  //     map((data: any) => {
  //       this.allItems.unshift(new Casting(data._id, name, false, false));
  //       this.publishUpdates();
  //     }),
  //     catchError(this.handleErrors)
  //   );
  // }

  // setDeleteFlag(item: Casting) {
  //   item.deleted = true;
  //   return this.put(item)
  //     .pipe(
  //       map(data => {
  //         item.done = false;
  //         this.publishUpdates();
  //       })
  //     );
  // }

  // unsetDeleteFlag(item: Casting) {
  //   item.deleted = false;
  //   return this.put(item)
  //     .pipe(
  //       map(data => {
  //         item.done = false;
  //         this.publishUpdates();
  //       })
  //     );
  // }


  // toggleDoneFlag(item: Casting) {
  //   item.done = !item.done;
  //   this.publishUpdates();
  //   return this.put(item);
  // }

  // permanentlyDelete(item: Casting) {
  //   return this.http
  //     .delete(
  //       this.baseUrl + "/" + item.id,
  //       { headers: this.getCommonHeaders() }
  //     )
  //     .pipe(
  //       map(data => {
  //         let index = this.allItems.indexOf(item);
  //         this.allItems.splice(index, 1);
  //         this.publishUpdates();
  //       }),
  //       catchError(this.handleErrors)
  //     );
  // }

  // private put(grocery: Casting) {
  //   return this.http.put(
  //     this.baseUrl + "/" + grocery.id,
  //     JSON.stringify({
  //       Name: grocery.name,
  //       Done: grocery.done,
  //       Deleted: grocery.deleted
  //     }),
  //     { headers: this.getCommonHeaders() }
  //   )
  //   .pipe(catchError(this.handleErrors));
  // }

  // private publishUpdates() {
  //   // Make sure all updates are published inside NgZone so that change detection is triggered if needed
  //   this.zone.run(() => {
  //     // must emit a *new* value (immutability!)
  //     this.items.next([...this.allItems]);
  //   });
  // }

  // private getCommonHeaders() {
  //   return new HttpHeaders({
  //     "Content-Type": "application/json",
  //     "Authorization": "Kinvey " + BackendService.token,
  //   });
  // }

  // private handleErrors(error: HttpErrorResponse) {
  //   console.log(error);
  //   return throwError(error);
  // }
}
