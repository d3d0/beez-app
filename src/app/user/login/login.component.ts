import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { Page } from "ui/page";
import { View } from "ui/core/view";
import { Animation } from "ui/animation";
import { Color } from "color";
import { TextField } from "tns-core-modules/ui/text-field";
import { connectionType, getConnectionType } from "connectivity";
import { registerElement } from 'nativescript-angular';
import { LottieView } from 'nativescript-lottie';
import { RouterExtensions } from "nativescript-angular/router";
import { localize } from "nativescript-localize";

import { alert } from "../../shared";
import { User } from '../user.model'
import { UserService } from "../user.service";
import { BackendService } from "../../shared/backend.service";

registerElement('LottieView', () => LottieView);

@Component({
  selector: 'ns-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  moduleId: module.id
})

export class LoginComponent implements OnInit {
  user: User;
  public animations: Array<string>;

  @ViewChild("labelmail") labelmail: ElementRef;
  @ViewChild("labelpass") labelpass: ElementRef;
  @ViewChild("textfieldmail") textfieldmail: ElementRef;
  @ViewChild("textfieldpass") textfieldpass: ElementRef;

  private _lottieView: LottieView;
  private isAuthenticating = false;

  constructor( private userService: UserService, private router: Router, private page: Page, private routerExtensions: RouterExtensions) {
    this.user = new User();
    this.user.mail = "";
    this.user.pass = "";
  }

  ngOnInit() {
    this.page.actionBarHidden = true;
  }

  lottieViewLoaded(event) {
    this._lottieView = <LottieView>event.object;
  }

  goToSignup(){
    this.router.navigate(["/user/signup"]);
  }

  login() {
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
    this.isAuthenticating = true;
    this.userService.getAnonXCSFRtoken().subscribe((result) => {
      BackendService.XCSFRtoken = result;
      console.log('getAnonXCSFRtoken ',result)
      this.userService.login(this.user).subscribe((result) => {
        BackendService.session_name = result['session_name']
        BackendService.sessid = result['sessid']
        BackendService.XCSFRtoken = result['token']
        BackendService.UID = result['user']['uid']
        this.isAuthenticating = false;
        this.routerExtensions.navigate(["../home"], { clearHistory: true });
       },
      (error) => {
        BackendService.reset()
        this.isAuthenticating = false;
        console.log('login user error ', error);
        if (error.status == 407)
          alert(localize("MESSAGES.CONFIRM_EMAIL"));
        else
        alert(localize("MESSAGES.ERROR_LOGIN"));
      });
    },
    (error) => {
      this.isAuthenticating = false;
      alert(localize("MESSAGES.ERROR_SERVICE"));
      console.log('login getAnonXCSFRtoken error: ',error);
    });
  }

  focusPassword() {
    this.textfieldpass.nativeElement.focus();
  }

  toggleLabel(event, type) {
    let text = event.object.text
    let animations = [];
    let textfield, label
    if (type == 'mail') {
      label = <View>this.labelmail.nativeElement;
      textfield = <View>this.textfieldmail.nativeElement;
    } else if (type == 'pass') {
      label = <View>this.labelpass.nativeElement;
      textfield = <View>this.textfieldpass.nativeElement;
    }
    if (event.eventName == 'focus' && text == '') {
      textfield.style.placeholderColor= new Color("transparent");
      textfield.style.borderColor= new Color("#5A82FF");
      animations.push({ target: label, translate: { x: 0, y: 0 }, opacity: 1, duration: 150 });
      new Animation(animations, true).play();
    }
    if (event.eventName == 'blur' && text == '') {
      textfield.style.placeholderColor= new Color("#d3d3d3");
      textfield.style.borderColor= new Color("#d3d3d3");
      animations.push({ target: label, translate: { x: 0, y: 20 }, opacity: 0, duration: 150 });
      new Animation(animations, true).play();
    }
  };
}
