import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'ns-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  moduleId: module.id,
})

export class LoginComponent implements OnInit {

	isAuthenticating = false;
  
  constructor( private router: Router ) { }

  ngOnInit() {
  	      console.log('hello from login Component');
  }

  goToSignup(){
    this.router.navigate(["/user/signup"]);
  }
	
}
