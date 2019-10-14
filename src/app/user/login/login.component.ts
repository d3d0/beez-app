import { Component, OnInit } from '@angular/core';
import { Page } from "ui/page";
import { connectionType, getConnectionType } from "connectivity";
import { registerElement } from 'nativescript-angular';
import { LottieView } from 'nativescript-lottie';
import { RouterExtensions } from "nativescript-angular/router";
import { localize } from "nativescript-localize";
// import { messaging, Message } from "nativescript-plugin-firebase/messaging";
import { PushNotificationsService } from "../../shared/pushNotifications.service";
import { openLink } from "../../shared/utils";
import { alert } from "../../shared/utils";
import { User } from '../user.model';
import { UserService } from "../user.service";
import { BackendService } from "../../shared/backend.service";
import { ActivatedRoute } from "@angular/router";
import * as dialogsModule from "ui/dialogs";

registerElement('LottieView', () => LottieView);

@Component({
  selector: 'ns-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  moduleId: module.id
})

export class LoginComponent implements OnInit {
  user: User;
  private _lottieView: LottieView;
  private openLink = openLink;
  private isLoading = false;
  private mostraPopup = false;
  private trovato = false;

  constructor( 
    private activeRoute: ActivatedRoute,
    private userService: UserService,
    private pushService: PushNotificationsService,
    private page: Page,
    private routerExtensions: RouterExtensions) {
    this.user = new User();
    this.user.mail = "";
    this.user.pass = "";
  }

  ngOnInit() {
    this.page.actionBarHidden = true;
    console.log('☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯');
    console.log('l☯☯☯l > LoginComponent > ngOnInit() > this.isLoading:', this.isLoading);
    console.log('l☯☯☯l > LoginComponent > ngOnInit() > BackendService.registeredUser', BackendService.registeredUser);
    console.log('l☯☯☯l > LoginComponent > ngOnInit() > BackendService.XCSFRtoken', BackendService.XCSFRtoken);
    console.log('l☯☯☯l > LoginComponent > ngOnInit() > BackendService.sessid', BackendService.sessid);
    console.log('l☯☯☯l > LoginComponent > ngOnInit() > BackendService.session_name', BackendService.session_name);
    console.log('☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯');
  }

  ngAfterViewInit() {
      if(BackendService.registeredUser) {
        this.alertSignup(localize("MESSAGES.CONFIRM_EMAIL"));
        console.log('@@@@@@@@@@@@ 1 > l☯☯☯l > ngAfterViewInit() > BackendService > registeredUser()', BackendService.registeredUser);
      }
  }

  // public onSelectedIndexChanged(event) {
  //   const picker = <ListPicker>event.object;
  //   console.log(`index: ${picker.selectedIndex}; item" ${this.years[picker.selectedIndex]}`);
  // }

  alertSignup (message: string) {
    return dialogsModule.alert({
      title: "",
      okButtonText: "OK",
      message: message
    }).then(function () {
      console.log("Dialog closed!");
      BackendService.registeredUser = false;
      console.log('@@@@@@@@@@@@ 2 > l☯☯☯l > alertSignup() > BackendService > registeredUser()', BackendService.registeredUser);
    });
  }

  lottieViewLoaded(event) {
    this._lottieView = <LottieView>event.object;
  }

  goToSignup(){
    // se this.isLoading == false allora puoi andare a registrazione
    if(!this.isLoading) this.routerExtensions.navigate(["/user/signup"]);
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

    // --> getAnonXCSFRtoken() function
    this.userService.getAnonXCSFRtoken().subscribe((result) => {
      
      // --> token
      BackendService.XCSFRtoken = result;
      console.log('l☯☯☯l > LoginComponent > getAnonXCSFRtoken() > BackendService.XCSFRtoken: ', BackendService.XCSFRtoken);
      console.log('l☯☯☯l > LoginComponent > getAnonXCSFRtoken() > BackendService.sessid: ', BackendService.sessid);
      console.log('l☯☯☯l > LoginComponent > getAnonXCSFRtoken() > BackendService.session_name: ', BackendService.session_name);

      // --> login() function
      this.userService.login(this.user).subscribe((result) => {

        // --> dati utente
        console.log('l☯☯☯l > LoginComponent > login() > user roles: ', result['user']['roles']);

        BackendService.session_name = result['session_name'];
        BackendService.sessid = result['sessid'];
        BackendService.XCSFRtoken = result['token'];
        BackendService.UID = result['user']['uid'];

        Object.keys(result['user']['roles']).forEach(key => {
          console.log('l☯☯☯l > LoginComponent > result user roles: ', result['user']['roles'][key]);
          // --> USER PENDING --> LOGOUT
          if (result['user']['roles'][key] == 'pending user') {
            this.userService.logoff().subscribe((result) => {
              console.log('logout da pending');
              this.alertSignup(localize("MESSAGES.CONFIRM_EMAIL"));
            }, (error) => {
              console.log('logoff error ',error);
              this.alertSignup(localize("MESSAGES.ERROR_SERVICE"));
            });
          }
          // --> USER NOT PENDING --> LOGIN
          if (result['user']['roles'][key] == 'authenticated user') {
            // FIREBASE
            // messaging.addOnPushTokenReceivedCallback(token => {
            //     console.log("l☯☯☯l > LoginComponent > addOnPushTokenReceivedCallback() > Firebase plugin received a push token: " + token);
            //     if (token) {
            //       this.pushService.push_token(token).subscribe((result) => {
            //         console.log("l☯☯☯l > pushService > push_token() > result from pushservice", result); // OK > Result getting the data!
            //       }, error => {
            //         console.log("l☯☯☯l > pushService > push_token() > error from pushservice ", error); // NO > Error getting the data!
            //       });
            //     }
            //   }
            // );
            // messaging.registerForPushNotifications({
            //   onMessageReceivedCallback: (message: Message) => {
            //     console.log("Push message received: " + message.title);
            //   },
            //   showNotifications: true,
            //   showNotificationsWhenInForeground: true
            // }).then(() => {
            //   console.log("Registered for push")
            // })
            this.routerExtensions.navigate(["../home"], { clearHistory: true });
          }
        });
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
        console.log('login user error', error);
        if (error.status == 407) {
          alert(localize("MESSAGES.CONFIRM_EMAIL"));
        }
        else {
          alert(localize("MESSAGES.ERROR_LOGIN"));
        }
        BackendService.reset();
      });

    },
    (error) => {
      this.isLoading = false;
      alert(localize("MESSAGES.ERROR_SERVICE"));
      console.log('login getAnonXCSFRtoken error: ',error);
    });
  }

  textfieldEvent(text, field){
    if(field)
      this.user[field]=text
  }

}
