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
import { User } from '../user.model'
import { alert } from "../../shared";
import { RouterExtensions } from "nativescript-angular/router";
import { localize } from "nativescript-localize";

registerElement('LottieView', () => LottieView);

@Component({
  selector: 'ns-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  moduleId: module.id,
})

export class LoginComponent implements OnInit {

  public animations: Array<string>;

  @ViewChild("labelmail") labelmail: ElementRef;
  @ViewChild("labelpass") labelpass: ElementRef;
  @ViewChild("textfieldmail") textfieldmail: ElementRef;
  @ViewChild("textfieldpass") textfieldpass: ElementRef;

  private _lottieView: LottieView;
  private user: User;
  private isAuthenticating = false;

  constructor( private router: Router, private page: Page, private routerExtensions: RouterExtensions) {
    this.user = new User();
  }

  ngOnInit() {
    console.log('hello from login Component');
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
    if (!this.user.isValidEmail()) {
      alert(localize("MESSAGES.ERROR_EMAIL"));
      return;
    }
    if (!this.user.isValidPassword()) {
      alert(localize("MESSAGES.ERROR_PASS"));
      return;
    }
    this.routerExtensions.navigate(["../home"], { clearHistory: true });

    // this.router.navigate(["/home"]);
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
