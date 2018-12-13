import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Page } from "ui/page";

@Component({
  selector: 'ns-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  moduleId: module.id,
})

export class LoginComponent implements OnInit {

	isAuthenticating = false;
  
  constructor( private router: Router, private page: Page) { }

  ngOnInit() {
    console.log('hello from login Component');
    this.page.actionBarHidden = true;
  }

  goToSignup(){
    this.router.navigate(["/user/signup"]);
  }
  
}
