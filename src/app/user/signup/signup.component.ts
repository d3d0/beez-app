import { Component, OnInit } from '@angular/core';
import { localize } from "nativescript-localize";

@Component({
  selector: 'ns-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  moduleId: module.id,
})
export class SignupComponent implements OnInit {

  constructor() { }
  signupMinorTitle = localize("SIGNUP.REGISTRATION_MINOR");
  signupTitle = localize("SIGNUP.REGISTRATION");
  ngOnInit() {
  }

}
