import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { Observable, of } from "rxjs";
import { map, catchError, retry } from 'rxjs/operators';
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { BackendService } from "./shared/backend.service";
import { ProfileService } from "./profile/profile.service";
import { isIOS, isAndroid, device } from "tns-core-modules/platform";


@Injectable()
export class AuthGuard implements CanActivate {

  private lingua: string;

  constructor(private router: Router,private http: HttpClient, private profile:ProfileService) {
    // https://stackoverflow.com/questions/48752830/platform-device-language-is-returning-the-wrong-language-when-i-change-my-phone
    // console.log(`device.language > ${device.language.substring(0,2).toLowerCase()}`); // For example "en" or "en-US".
    this.lingua = device.language.substring(0,2).toLowerCase();
  }

  canActivate(): Observable<boolean> {
    console.log("☯☯☯ guard");

    // headers
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Accept', 'application/json');
    headers = headers.set('Cache-Control', 'no-cache');
    headers = headers.set('Connection', 'keep-alive');
    headers = headers.set('X-CSRF-Token', BackendService.XCSFRtoken);
    if(isIOS) headers = headers.set('Cookie', BackendService.session_name + "=" + BackendService.sessid); // funziona su ios!
    if(isAndroid) {
      if(BackendService.loggato == 'ok') {
        console.log('☯☯☯ successive login!', BackendService.loggato);
        headers = headers.set('Cookie', BackendService.session_name + "=" + BackendService.sessid); // funziona su android DOPO primo login!
      } 
      if(BackendService.loggato != 'ok') {
        console.log('☯☯☯ prima login!', BackendService.loggato);
        headers = headers.set('Session', BackendService.session_name + "=" + BackendService.sessid); // funziona su android AL primo login!
      }
    }
    
    // console.log("☯☯☯ guard XCSFRtoken >", BackendService.XCSFRtoken);
    // console.log("☯☯☯ guard session_name >", BackendService.session_name);
    // console.log("☯☯☯ guard sessid >", BackendService.sessid);

    

    // request
    return this.http.post(BackendService.baseUrl + "beez/system/connect", {}, {headers: headers}).pipe(
      map(res => {
        if(res['user']['uid']>0) { // OK > User authenticated!
          BackendService.loggato = 'ok';
          console.log('☯☯☯ res', res);
          console.log('☯☯☯ user logged in!'); 
          // language
          this.profile.setLanguage(this.lingua,res['user']['uid']).subscribe((data) => {
            console.log('************************ setLanguage data ',data);
          },
          (error)=> {
            console.log('************************ setLanguage error ',error);
          });
          return true;
        }
        else { // NO > User not authenticated!
          BackendService.reset(); 
          this.router.navigate(["/user"]);
          console.log('☯☯☯ res', res);
          console.log('☯☯☯ user NOT logged in!'); 
          return false;
        }
      }),
      retry(3), // retry a failed request up to 3 times
      catchError((err) => { // NO > User not authenticated!
        BackendService.reset(); 
        this.router.navigate(["/user"]);
        return of(false);
      })
    );
  }

}