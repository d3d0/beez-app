import { Injectable } from "@angular/core";
// https://docs.nativescript.org/ns-framework-modules/application-settings
import { getString, setString, setBoolean, getBoolean, hasKey, getNumber } from "application-settings"; 
import { HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class BackendService {
  static baseUrl = "https://castinghub.beez.io/services/";
  static term_ita = "beez/elenco-terms-it";
  static term_eng = "beez/elenco-terms-en";
  
  static isLoggedIn(): boolean {
    return !!getString('sessid');
  }

  // d3d0 --> boolean per modale di registrazione
  static get registeredUser() {
    return getBoolean("isRegistered", false);
  }
  static set registeredUser(value) {
    setBoolean("isRegistered",value);
  }

  // d3d0 --> boolean per minorenne
  static get isMinor() {
    return getBoolean("isMinor", false);
  }
  static set isMinor(value) {
    setBoolean("isMinor",value);
  }

  static firstLogin(): boolean {
    if (hasKey('firstLogin')) return false
    setString('firstLogin', 'true')
    return true
  }

  static showProfilePopup(): boolean {
    if (hasKey('showProfilePopup')) return true
    setString('showProfilePopup', 'false')
    return false
  }

  static get loggato() {
    console.log('l☯☯☯l > BackendService > XCSFRtoken() > Get loggato from storage: ', getString('loggato'));
    return getString('loggato');
  }
  static set loggato(parametro) {
    setString('loggato', parametro);
    console.log('SET loggato TO: ' + parametro);
  }

  static get XCSFRtoken() {
    //console.log('l☯☯☯l > BackendService > XCSFRtoken() > Get XCSFRtoken from storage: ', getString('XCSFRtoken'));
    return getString('XCSFRtoken');
  }
  static set XCSFRtoken(newToken) {
    setString('XCSFRtoken', newToken);
    // console.log('SET XCSFRtoken TO: ' + newToken);
  }

  static get sessid() {
    //console.log('l☯☯☯l > BackendService > sessid() > Get sessid from storage: ', getString('sessid'));
    return getString('sessid');
  }
  static set sessid(newToken) {
    setString('sessid', newToken);
    // console.log('SET sessid TO: ' + newToken);
  }

  static get session_name() {
    //console.log('l☯☯☯l > BackendService > session_name() > Get session_name from storage: ', getString('session_name'));
    return getString('session_name');
  }
  static set session_name(newToken) {
    setString('session_name', newToken);
    // console.log('SET session_name TO: ' + newToken);
  }

  static get UID() {
    //console.log('l☯☯☯l > BackendService > session_name() > Get UID from storage: ', getString('UID'));
    return getString('UID');
  }
  static set UID(newToken) {
    setString('UID', newToken);
    // console.log('SET UID TO: ' + newToken);
  }
  static get user_name() {
    console.log('l☯☯☯l > BackendService > user_name() > Get user_name from storage: ', getString('user_name'));
    return getString('user_name');
  }
  static set user_name(newToken) {
    setString('user_name', newToken);
    // console.log('SET UID TO: ' + newToken);
  }

  static get email_notify() {
    console.log('l☯☯☯l > BackendService > email_notify() > Get email_notify from storage: ', getString('email_notify'));
    return getString('email_notify');
  }
  static set email_notify(newToken) {
    setString('email_notify', newToken);
    // console.log('SET UID TO: ' + newToken);
  }

  static validateCode(response) {
    return new Promise((resolve, reject) => {
      if (response.statusCode >= 200 && response.statusCode < 300) {
        resolve(response)
      }
      // console.log('Response with code: ' + response.statusCode + '\nContent: ' + response.content.toString());
      reject('Response with code: ' + response.statusCode + '\nContent: ' + response.content.toString())
    })
  }

  static reset(){
    // if(appSettings.hasKey("XCSFRtoken")) {
    //   appSettings.remove("XCSFRtoken");
    // }
    // if(appSettings.hasKey("sessid")) {
    //   appSettings.remove("sessid");
    // }
    // if(appSettings.hasKey("session_name")) {
    //   appSettings.remove("session_name");
    // }
    BackendService.session_name = '';
    BackendService.sessid = '';
    BackendService.XCSFRtoken = '';
    BackendService.email_notify = '';
    BackendService.loggato = '';
    //console.log('l☯☯☯l > BackendService > reset()');
  }

  static printAll(){
    console.log(
      'BackendService.UID',BackendService.UID,
      'BackendService.user_name',BackendService.user_name,
      'BackendService.session_name: ',BackendService.session_name,
      'BackendService.sessid: ', BackendService.sessid,
      'BackendService.XCSFRtoken: ', BackendService.XCSFRtoken)
  }

  static getCommonHeaders(){
    return  new HttpHeaders({
      'Content-Type': "application/json",
      'Accept': 'application/json',
      'Cache-Control': 'no-cache',
      'x-csrf-token': BackendService.XCSFRtoken,
      'Cookie': BackendService.session_name + "=" + BackendService.sessid
    })
  }
  
  static getServiceCommonHeaders(){
    return  new HttpHeaders({
      'Content-Type': "application/json",
      'Accept': 'application/json',
      'Cache-Control': 'no-cache',
      'x-csrf-token': BackendService.XCSFRtoken,
      'Session': BackendService.session_name + "=" + BackendService.sessid
    })
  }

  static getRawCommonHeaders(){
    return  {
      "Content-Type": "application/octet-stream",
      "File-Name": 'name',
      'x-csrf-token': BackendService.XCSFRtoken,
      'Cookie': BackendService.session_name + "=" + BackendService.sessid
    }
  }
  
  getJson(response) {
    return new Promise((resolve, reject) => {
      resolve(response.content.toJSON())
    })
    .catch(e => {
      console.error('Error parsing JSON response: ' + e)
      throw 'Error parsing JSON response: ' + e
    })
  }
}
