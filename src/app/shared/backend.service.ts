import { Injectable } from "@angular/core";
import { getString, setString } from "application-settings";

@Injectable()
export class BackendService {
  static baseUrl = "https://dev.beez.io/services/";
  
  static isLoggedIn(): boolean {
    return !!getString('sessid');
  }
 
  // static getAnonXCSFRtoken(){ 
  //   //  return new Promise((resolve, reject) => {
  //   //   this.http.get({
  //   //   url: this.baseUrl + "session/token",
  //   //   method: "GET"
  //   // })
  //   // .then(data => {
  //   //   console.log(data.content.toString())
  //   //   this.XCSFRtoken = data.content.toString()
  //   //   })
  //   // })
  // }

 static get XCSFRtoken() {
   console.log('GETTING XCSFRtoken: ' + getString('XCSFRtoken'))
    return getString('XCSFRtoken');
  }

  static set XCSFRtoken(newToken) {
    setString('XCSFRtoken', newToken);
    // console.log('SET XCSFRtoken TO: ' + newToken)
  }

  static get sessid() {
   console.log('GETTING sessid: ' + getString('sessid'))
    return getString('sessid');
  }

  static set sessid(newToken) {
    setString('sessid', newToken);
    // console.log('SET sessid TO: ' + newToken)
  }

  static get session_name() {
   console.log('GETTING session_name: ' + getString('session_name'))
    return getString('session_name');
  }

  static set session_name(newToken) {
    setString('session_name', newToken);
  //  console.log('SET session_name TO: ' + newToken)
  }pr

  validateCode(response) {
    return new Promise((resolve, reject) => {
      if (response.statusCode >= 200 && response.statusCode < 300) {
        resolve(response)
      }
     // console.log('Response with code: ' + response.statusCode + '\nContent: ' + response.content.toString())
     reject('Response with code: ' + response.statusCode + '\nContent: ' + response.content.toString())
    })
  }

  static reset(){
    BackendService.session_name = ''
    BackendService.sessid = ''
    BackendService.XCSFRtoken = ''
  }

  static printAll(){
   console.log(
     'BackendService.session_name: ',BackendService.session_name,
     'BackendService.sessid: ', BackendService.sessid,
     'BackendService.XCSFRtoken: ', BackendService.XCSFRtoken)
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
  // static get token(): string {
  //   return getString("token");
  // }


  // static set token(theToken: string) {
  //   setString("token", theToken);
  // }
}
