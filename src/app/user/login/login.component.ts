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
import { messaging, Message } from "nativescript-plugin-firebase/messaging";

import { PushNotificationsService } from "../../shared/pushNotifications.service"
import { openLink } from "../../shared/utils"
import { alert } from "../../shared/utils";
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
  private isLoading = false;
  private openLink = openLink

  constructor( private userService: UserService,
    private router: Router,
    private pushService: PushNotificationsService,
    private page: Page,
    private routerExtensions: RouterExtensions) {
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
    if(!this.isLoading) this.router.navigate(["/user/signup"]);
  }

  login(){
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
    this.isLoading = true;
    this.userService.getAnonXCSFRtoken().subscribe((result) => {
      BackendService.XCSFRtoken = result;
      this.userService.login(this.user).subscribe((result) => {
        BackendService.session_name = result['session_name']
        BackendService.sessid = result['sessid']
        BackendService.XCSFRtoken = result['token']
        BackendService.UID = result['user']['uid']
        this.isLoading = false;
        /// push notification send token
        messaging.getCurrentPushToken()
            .then(token =>  {
              console.log(`Current push token: ${token}`)
              this.pushService.push_token(token).subscribe(result => console.log("resulult form pushservice", result))
            } 
        ).catch( err=> console.log(err))

        this.routerExtensions.navigate(["../home"], { clearHistory: true });
       },
      (error) => {
        BackendService.reset()
        this.isLoading = false;
        console.log('login user error ', error);
        if (error.status == 407)
          alert(localize("MESSAGES.CONFIRM_EMAIL"));
        else
        alert(localize("MESSAGES.ERROR_LOGIN"));
      });
    },
    (error) => {
      this.isLoading = false;
      alert(localize("MESSAGES.ERROR_SERVICE"));
      console.log('login getAnonXCSFRtoken error: ',error);
    });
  }

  textfieldEvent($event, field){
    this.user[field]=$event.object.text
    if ($event.eventName == 'returnPress') this.login()
  }

}
