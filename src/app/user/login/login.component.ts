import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Page } from "ui/page";

import { registerElement } from 'nativescript-angular';
import { LottieView } from 'nativescript-lottie';
registerElement('LottieView', () => LottieView);

@Component({
  selector: 'ns-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  moduleId: module.id,
})

export class LoginComponent implements OnInit {
  public loop: boolean = true;
  public src: string;
  public autoPlay: boolean = true;
  public animations: Array<string>;

  private _lottieView: LottieView;

	isAuthenticating = false;
  
  constructor( private router: Router, private page: Page) { 
    this.animations = ['data.json'];
    this.src = this.animations[0];
  }
  lottieViewLoaded(event) {
    this._lottieView = <LottieView>event.object;
  }
  ngOnInit() {
    console.log('hello from login Component');
    this.page.actionBarHidden = true;
  }

  goToSignup(){
    this.router.navigate(["/user/signup"]);
  }
  
}
