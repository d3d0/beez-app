import { Component, OnInit } from '@angular/core';
import { localize } from "nativescript-localize";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
  selector: 'ns-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  moduleId: module.id,
})
export class SignupComponent implements OnInit {

  constructor(private routerExtensions: RouterExtensions) { }
  signupMinorTitle = localize("SIGNUP.REGISTRATION_MINOR");
  signupTitle = localize("SIGNUP.REGISTRATION");
  ngOnInit() {
  }

	public goBack() {
	    this.routerExtensions.back();
	}
	
}
