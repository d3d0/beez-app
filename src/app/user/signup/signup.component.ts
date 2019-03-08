import { Component, ViewChild, EventEmitter, Output, ElementRef, OnInit } from '@angular/core';
import { localize } from "nativescript-localize";
import { RouterExtensions } from "nativescript-angular/router";
import { connectionType, getConnectionType } from "connectivity";
import { alert } from "../../shared";
import * as dialogs from "tns-core-modules/ui/dialogs";
import { View } from "ui/core/view";
import { Color } from "color";
import { Animation } from "ui/animation";

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
export class SignupComponent implements OnInit{
  user: User;
  profile: Profile;
  selectedIndex = 0;
  private signupMinorTitle
  private signupTitle
  private isAuthenticating = true;
  private tabs = [];

  @ViewChild('tabHighlight') tabHighlight: ElementRef;
  @ViewChild('tab1') tab1: ElementRef;
  @ViewChild('tab2') tab2: ElementRef;

  constructor(private routerExtensions: RouterExtensions, private userService: UserService) {
    this.profile = new Profile();
    this.user = new User();
    this.signupMinorTitle = localize("SIGNUP.REGISTRATION_MINOR");
    this.signupTitle = localize("SIGNUP.REGISTRATION");
   }

  ngOnInit() {
    console.log('hello from CASTING component');

    this.tabs[0] = <View>this.tab1.nativeElement;
    this.tabs[1] = <View>this.tab2.nativeElement;
    this.tabs[0].className = "active";
    // this.tabs[0].style.color = new Color("#00D796");
  }

  public onSelectedIndexChange(index) {
    let previousTab = this.selectedIndex;
    if (index != this.selectedIndex) {
      this.tabs[index].className = "active";
      this.tabs[previousTab].className = "not-active";
      this.selectedIndex = index;
    }
  }

  toggleLabel(event, type) {
    let text = event.object.text
    let animations = [];
    let textfield, label
    // if (type == 'mail') {
    //   label = <View>this.labelmail.nativeElement;
    //   textfield = <View>this.textfieldmail.nativeElement;
    // } else if (type == 'pass') {
    //   label = <View>this.labelpass.nativeElement;
    //   textfield = <View>this.textfieldpass.nativeElement;
    // }

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
