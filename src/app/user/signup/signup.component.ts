import { Component, ViewChild, EventEmitter, ElementRef, OnInit, ViewContainerRef } from '@angular/core';
import { localize } from "nativescript-localize";
import { RouterExtensions } from "nativescript-angular/router";
import { connectionType, getConnectionType } from "connectivity";



import { User } from '../user.model'
import { UserService } from "../user.service";
import { BackendService } from "../../shared/backend.service";
import { openLink } from "../../shared/utils"
import { alert } from "../../shared/utils";

@Component({
  selector: 'ns-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  moduleId: module.id,
})
export class SignupComponent implements OnInit{
  user: User;
  selectedIndex = 0;
  private signupMinorTitle
  private signupTitle
  private isLoading = false;
  private tabs = [];
  private openLink = openLink

  // @ViewChild('tabHighlight') tabHighlight: ElementRef;
  @ViewChild('tab1') tab1: ElementRef;
  @ViewChild('tab2') tab2: ElementRef;

  constructor(
    private routerExtensions: RouterExtensions,
    private userService: UserService,

    ) {
    this.user = new User();
    this.signupMinorTitle = localize("SIGNUP.REGISTRATION_MINOR");
    this.signupTitle = localize("SIGNUP.REGISTRATION");
  }

  ngOnInit() {
    this.tabs[0] = this.tab1.nativeElement;
    this.tabs[1] = this.tab2.nativeElement;
    this.tabs[0].className = "active";
    // this.tabs[0].style.color = new Color("#00D796");
  }

  public onSelectedIndexChange(index) {
    if (index != this.selectedIndex) {
      this.tabs[index].className = "active";
      this.tabs[this.selectedIndex].className = "not-active";
      this.selectedIndex = index;
    }
  }

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
    this.userService.getAnonXCSFRtoken().subscribe((result) => {
      BackendService.XCSFRtoken = result;
      this.userService.signup(this.user).subscribe((result) => {
        alert(localize("MESSAGES.CONFIRM_EMAIL"));
        this.isLoading = false;
        this.routerExtensions.navigate(["/"], { clearHistory: true });
      }, (error) => {
        BackendService.reset()
        this.isLoading = false;
        if (error.status == 406)
          alert(localize("MESSAGES.ERROR_ACCOUNT_DOUBLE"));
        else
          alert(localize("MESSAGES.ERROR_SERVICE"));
        console.log('signin user error ', error)
      });
    }, (error) => {
      this.isLoading = false;
      console.log('getAnonXCSFRtoken error: ',error);
    });
  }

  selectEvent(value, field){
    if (field) this.user[field]=value
  }

  textfieldEvent(text, field){
    if (field) this.user[field]=text
  }

  goBack() {
    if(!this.isLoading) this.routerExtensions.back();
  }

}
