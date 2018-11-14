import { Injectable } from "@angular/core";
import { getString, setString } from "application-settings";
const localize = require("nativescript-localize");
const currentLang = localize("LANG");

const XCSFRtoken = "XCSFRtoken";
const sessid = "sessid";
const session_name = "session_name";

export class BackendService {

  static baseUrl = "https://dev.beez.io/services/";

  static isLoggedIn(): boolean {
    return !!getString("token");
  }

  static getCommonHeaders() {
    return {
      "Content-Type": "application/json",
      "X-CSFR-token":  getString(XCSFRtoken) || this.getAnonXCSFRtoken(),
    }
  }
  
  static getAnonXCSFRtoken(){ 
     return new Promise((resolve, reject) => {
      http.request({
      url: this.baseUrl + "session/token",
      method: "GET"
    })
    .then(data => {
      console.log(data.content.toString())
      this.XCSFRtoken = data.content.toString()
      })
    })
  }

  get XCSFRtoken() {
    console.log('GETTING XCSFRtoken: ' + getString(XCSFRtoken))
    return getString(XCSFRtoken);
  }

  set XCSFRtoken(newToken) {
    setString(XCSFRtoken, newToken);
    console.log('SET XCSFRtoken TO: ' + newToken)
  }

  get sessid() {
    console.log('GETTING sessid: ' + getString(sessid))
    return getString(sessid);
  }

  set sessid(newToken) {
    setString(sessid, newToken);
    console.log('SET sessid TO: ' + newToken)
  }

  get session_name() {
    console.log('GETTING session_name: ' + getString(session_name))
    return getString(session_name);
  }

  set session_name(newToken) {
    setString(session_name, newToken);
    console.log('SET session_name TO: ' + newToken)
  }

  validateCode(response) {
    return new Promise((resolve, reject) => {
      if (response.statusCode >= 200 && response.statusCode < 300) {
        resolve(response)
      }
     // console.log('Response with code: ' + response.statusCode + '\nContent: ' + response.content.toString())
     reject('Response with code: ' + response.statusCode + '\nContent: ' + response.content.toString())
    })
  }

  getJson(response) {
    return new Promise((resolve, reject) => {
     // console.info('Content: ' + response.content.toString())
      resolve(response.content.toJSON())
    })
      .catch(e => {
        console.error('Error parsing JSON response: ' + e)
        throw 'Error parsing JSON response: ' + e
      })
  }
  // static get token(): string {
  //   return getString("token");
  // }

  // static set token(theToken: string) {
  //   setString("token", theToken);
  // }
}
