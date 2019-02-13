import { Component } from '@angular/core';
import { localize } from "nativescript-localize";
import { RouterExtensions } from "nativescript-angular/router";
import { connectionType, getConnectionType } from "connectivity";

import { Profile } from "../profile.model"
import { User } from '../user.model'
import { UserService } from "../user.service";
import { BackendService } from "../../shared/backend.service";

@Component({
  selector: 'ns-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  moduleId: module.id,
})
export class SignupComponent {
  user: User;
  profile: Profile;
  private signupMinorTitle
  private signupTitle
  constructor(private routerExtensions: RouterExtensions, private userService: UserService) {
    this.profile = new Profile();
    this.user = new User();
    this.user.mail="mirko@loool.it"
    this.user.pass="12345678"
    this.profile.name="mirko"
    this.profile.surname="mirko"
    this.signupMinorTitle = localize("SIGNUP.REGISTRATION_MINOR");
    this.signupTitle = localize("SIGNUP.REGISTRATION");
   }

   signup(){
     console.log('user ', this.user)
     console.log('profile ', this.profile)
    if (getConnectionType() === connectionType.none) {
      alert(localize("MESSAGES.NO_CONNECTION"));
      return;
    }
    if (!User.isValidEmail(this.user.mail)) {
      alert(localize("MESSAGES.ERROR_EMAIL"));
      return;
    }
    if (!User.isValidPassword(this.user.pass)) {
      alert(localize("MESSAGES.ERROR_PASS"));
      return;
    }
    this.userService.getAnonXCSFRtoken().subscribe((result) => {
      BackendService.XCSFRtoken = result;
      console.log('getAnonXCSFRtoken ',result)

      this.userService.signup(this.user, this.profile).subscribe((result) => {
        console.log('userService.signup ',result)
        BackendService.session_name = result['session_name']
        BackendService.sessid = result['sessid']
        BackendService.XCSFRtoken = result['token']
        this.routerExtensions.navigate(["../home"], { clearHistory: true });
      }, (error) => {
        BackendService.reset()
        console.log('signin user error ', error);
      });
    }, (error) => {
      console.log('getAnonXCSFRtoken error: ',error);
    });
  }

   
    goBack() {
  	    this.routerExtensions.back();
  	}
	
}
