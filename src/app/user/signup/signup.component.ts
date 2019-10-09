import { Component, ViewChild, EventEmitter, ElementRef, OnInit, ViewContainerRef } from '@angular/core';
import { localize } from "nativescript-localize";
import { RouterExtensions } from "nativescript-angular/router";
import { connectionType, getConnectionType } from "connectivity";

import { User } from '../user.model'
import { UserService } from "../user.service";
import { BackendService } from "../../shared/backend.service";
import { TaxonomyService } from "../../shared/taxonomy.service";
import { openLink } from "../../shared/utils"

import * as dialogsModule from "ui/dialogs";
import { ActivatedRoute, Router } from "@angular/router";


@Component({
  selector: 'ns-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  moduleId: module.id,
})
export class SignupComponent implements OnInit{
  user: User;
  selectedIndex = 0;
  private signupMinorTitle
  private signupTitle
  private isLoading = false;
  private tabs = [];
  private openLink = openLink;
  private registrato = false;

  // @ViewChild('tabHighlight') tabHighlight: ElementRef;
  @ViewChild('tab1', {static: true}) tab1: ElementRef;
  @ViewChild('tab2', {static: true}) tab2: ElementRef;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private routerExtensions: RouterExtensions,
    private userService: UserService,
    private taxonomyService: TaxonomyService ) {
      this.user = new User();
      this.signupMinorTitle = localize("SIGNUP.REGISTRATION_MINOR");
      this.signupTitle = localize("SIGNUP.REGISTRATION");
  }

  ngOnInit() {
    this.tabs[0] = this.tab1.nativeElement;
    this.tabs[1] = this.tab2.nativeElement;
    // this.tabs[0].className = "active"; // FIX 23/09
    // this.tabs[0].style.color = new Color("#00D796"); 
    console.log('l☯☯☯l > SignupComponent > ngOnInit() > this.isLoading:', this.isLoading);
    BackendService.registeredUser = false;
    console.log('@@@@@@@@@@@@ > l☯☯☯l > BackendService > registeredUser()', BackendService.registeredUser);
  }

  public onSelectedIndexChange(index) {
    if (index != this.selectedIndex) {
      // this.tabs[index].className = "active"; // FIX 23/09
      // this.tabs[this.selectedIndex].className = "not-active"; // FIX 23/09
      this.selectedIndex = index;
    }
  }

  // d3d0 --> alert spostata in login
  // alertSignup (message: string) {
  //   return dialogsModule.alert({
  //     title: "",
  //     okButtonText: "OK",
  //     message: message
  //   }).then(function () {
  //     console.log("Dialog closed!");
  //   });
  // }

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
    this.isLoading = true;

    // --> getAnonXCSFRtoken() function
    this.userService.getAnonXCSFRtoken().subscribe((result) => {

      // --> token
      BackendService.XCSFRtoken = result;
      //console.log('l☯☯☯l > LoginComponent > getAnonXCSFRtoken() > BackendService.XCSFRtoken: ', BackendService.XCSFRtoken);

      // --> login() function
      this.userService.signup(this.user).subscribe((result) => {
        console.log('l☯☯☯l > UserService > signup() > result:', result);
        this.isLoading = false;
        this.routerExtensions.navigate(["/user/login"], { clearHistory: true }); // OK
        // d3d0 --> imposto registrato a true 
        BackendService.registeredUser = true;
        console.log('@@@@@@@@@@@@ > l☯☯☯l > BackendService > registeredUser()', BackendService.registeredUser);
        // d3d0 --> alert spostata in login
        // this.alertSignup(localize("MESSAGES.CONFIRM_EMAIL"));
      }, (error) => {
        BackendService.reset()
        this.isLoading = false;
        if (error.status == 406) {
          alert(localize("MESSAGES.ERROR_ACCOUNT_DOUBLE"));
        }
        else {
          alert(localize("MESSAGES.ERROR_SERVICE"));
        }
        console.log('signin user error ', error)
      });
    }, (error) => {
      this.isLoading = false;
      console.log('getAnonXCSFRtoken error: ',error);
    });

    console.log('l☯☯☯l > SignupComponent > signup() > this.isLoading:', this.isLoading);

  }

  selectEvent(value, field){
    if (field) this.user[field]=value;
  }

  textfieldEvent(text, field){
    if (field) this.user[field]=text;
  }

  goBack() {
    if(!this.isLoading) this.routerExtensions.back();
  }

}
