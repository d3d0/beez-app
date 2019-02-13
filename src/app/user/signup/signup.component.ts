import { Component, OnInit } from '@angular/core';
import { localize } from "nativescript-localize";
import { RouterExtensions } from "nativescript-angular/router";
import { Profile } from "../profile.model"
import { User } from "../user.model"
@Component({
  selector: 'ns-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  moduleId: module.id,
})
export class SignupComponent implements OnInit {
  user: User;
  profile: Profile;
  constructor(private routerExtensions: RouterExtensions) {
    this.user = new User();
    this.profile = new Profile();
 }
  signupMinorTitle = localize("SIGNUP.REGISTRATION_MINOR");
  signupTitle = localize("SIGNUP.REGISTRATION");
  ngOnInit() {
  }

	public goBack() {
	    this.routerExtensions.back();
	}
	
}
