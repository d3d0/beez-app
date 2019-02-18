import { Component } from '@angular/core';
import { localize } from "nativescript-localize";
import { RouterExtensions } from "nativescript-angular/router";
import { connectionType, getConnectionType } from "connectivity";
import * as trace from "tns-core-modules/trace"
import { alert } from "../../shared";
import * as dialogs from "tns-core-modules/ui/dialogs";

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
  private isAuthenticating = true;

  constructor(private routerExtensions: RouterExtensions, private userService: UserService) {
    this.profile = new Profile();
    this.user = new User();
    this.user.mail="mirko@loool.it"
    this.user.pass="12345678"
    this.profile.name="mirko"
    this.profile.surname="sacchetti"
    this.signupMinorTitle = localize("SIGNUP.REGISTRATION_MINOR");
    this.signupTitle = localize("SIGNUP.REGISTRATION");
   }

   signup(){
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
      this.userService.signup(this.user, this.profile).subscribe((result) => {
        this.routerExtensions.navigate(["/user/login"], { clearHistory: true });
        alert(localize("MESSAGES.CONFIRM_EMAIL"));
      }, (error) => {
        BackendService.reset()
        if (error.status == 406)
          alert(localize("MESSAGES.ERROR_ACCOUNT_DOUBLE"));
        else
          alert(localize("MESSAGES.ERROR_SERVICE"));

        console.log('signin user error ', error)
      });
    }, (error) => {
      console.log('getAnonXCSFRtoken error: ',error);
    });
  }

   
    goBack() {
  	    this.routerExtensions.back();
  	}
	
}
