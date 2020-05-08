import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { localize } from "nativescript-localize";

import { User } from "./user.model";
import { Profile } from "./profile.model";
import { BackendService } from "../shared/backend.service";

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient) { }

    /**
     * checkToken
     * @param user
     */
    // checkToken() {
    // return this.http.post(
    //   BackendService.baseUrl + "beez/system/connect", {},
    //   {
    //     headers: this.getCommonHeader()
    //   });
    // }

    /**
     * 
     * login utente
     * @param user 
     */
    login(user: User) {
    return this.http.post(
      BackendService.baseUrl + "beez/user/login",
      JSON.stringify({
        username: user.mail.trim(),
        password: user.pass
      }),
      {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          "x-csrf-token":  BackendService.XCSFRtoken
        })
      }).pipe( 
      tap(response => {
        if( this.checkRole(response , 'pending user')) {
          //throw new Error('pending');
        }
      }),
      catchError(this.handleErrors)
      )
    }

    /**
     * 
     * logout utente
     */
    logoff() {
      return this.http.post( BackendService.baseUrl + "beez/user/logout",{} ,
      {
        headers: this.getCommonHeader()
      });
    }
    
    // PATTERN: nomefiglio + tutormail
    // marcolorenzo.dedonato@gmail.com
    // francescalorenzo@loool.com

    /**
     * 
     * registrazione utente
     * @param user 
     */
    signup(user: User) {
      let username = '';
      let tutor_mail = '';
      let tutor1_mail = '';
      let mail = '';


      if(user.tutor_name != '' && user.tutor_surname != '') {
        username = user.username;
        mail = user.username;
        // tutor_mail = user.mail;
        tutor_mail = user.tutor_email;
        tutor1_mail = user.tutor1_email;
      } else {
        username = user.mail;
        mail = user.mail;
      }

      console.log('USERNAME ------------>',username);
      console.log('MAIL ------------>',mail);
      console.log('TUTOR MAIL ------------>',tutor_mail);
      console.log('TUTOR 1 MAIL ------------>',tutor1_mail);

      return this.http.post(
        BackendService.baseUrl + "beez/loool/register",
        JSON.stringify({
          "mail": mail,
          "pass": user.pass,
          "name": username,
          "field_registrato_da_app":{"und":[{"value":1}]},
          "profile": {
            "field_name":user.name,
            "field_gender":user.gender,
            "field_surname":user.surname,
            "field_date_of_birth":user.date_of_birth,
            "field_place_of_birth":user.place_of_birth,
            "field_minor_address":user.minor_address,
            
            "field_tutor_name":user.tutor_name,
            "field_tutor_surname":user.tutor_surname,
            "field_tutor_date_of_birth":user.tutor_date_of_birth,
            "field_tutor_email":user.tutor_email,
            "field_tutor_place_of_birth": user.tutor_place_of_birth,
            "field_tutor_address": user.tutor_address,
            "field_tutor_phone": user.tutor_phone,
            "field_tutor_id_card_type": user.tutor_id_card_type,
            "field_tutor_id_card_number": user.tutor_id_card_number,
            "field_tutor_id_card_released_by": user.tutor_id_card_released_by,
            "field_tutor_id_card_date": user.tutor_id_card_date,
            "field_tutor_id_card_expiry": user.tutor_id_card_expiry,

            "field_tutor1_name":user.tutor1_name,
            "field_tutor1_surname":user.tutor1_surname,
            "field_tutor1_date_of_birth":user.tutor1_date_of_birth,
            "field_tutor1_email":user.tutor1_email,
            "field_tutor1_place_of_birth": user.tutor1_place_of_birth,
            "field_tutor1_address": user.tutor1_address,
            "field_tutor1_phone": user.tutor1_phone,
            "field_tutor1_id_card_type": user.tutor1_id_card_type,
            "field_tutor1_id_card_number": user.tutor1_id_card_number,
            "field_tutor1_id_card_released_by": user.tutor1_id_card_released_by,
            "field_tutor1_id_card_date": user.tutor1_id_card_date,
            "field_tutor1_id_card_expiry": user.tutor1_id_card_expiry,
            
          }
        }),
        {
          headers: new HttpHeaders({
            "Content-Type": "application/json",
            "x-csrf-token":  BackendService.XCSFRtoken
          })
        })
    }

    private handleErrors(error: Response){
      if (error.status == 407){
        BackendService.reset()
        alert(localize("MESSAGES.CONFIRM_EMAIL"));
      }
      return throwError(error);
    }

    private getCommonHeader(){
      return new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'X-CSRF-Token': BackendService.XCSFRtoken,
        'Cookie': BackendService.session_name + "=" + BackendService.sessid
      })
    }

    checkRole(response, role){
      let roles=response['user']['roles'];
      let keys;
      if (roles) {
        keys = Object.keys(roles);
      }
      return !!keys.filter(key=>roles[key] === role).length;
    }

    getAnonXCSFRtoken(){
      return this.http.get( BackendService.baseUrl + "session/token",
      {
        headers: new HttpHeaders({"Content-Type": "application/json"}),
        responseType: 'text'
      })
    }
  }
