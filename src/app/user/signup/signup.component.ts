import { Component, ViewChild, EventEmitter, Output, ElementRef, OnInit, ViewContainerRef } from '@angular/core';
import { localize } from "nativescript-localize";
import { RouterExtensions } from "nativescript-angular/router";
import { connectionType, getConnectionType } from "connectivity";
import { View } from "ui/core/view";
import { Color } from "color";
import { Animation } from "ui/animation";
import { ModalDialogOptions, ModalDialogService } from "nativescript-angular/modal-dialog";

import { SelectModalViewComponent } from "../../shared/select-modal-view/select-modal-view.component";
import { TaxonomyService} from "../../shared/taxonomy.service";
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
  private genders = [];
  private openLink = openLink

  @ViewChild('tabHighlight') tabHighlight: ElementRef;
  @ViewChild('tab1') tab1: ElementRef;
  @ViewChild('tab2') tab2: ElementRef;

  constructor(
    private routerExtensions: RouterExtensions,
    private userService: UserService,
    private vcRef: ViewContainerRef,
    private modal: ModalDialogService,
    private taxonomyService: TaxonomyService,

    ) {
    this.user = new User();
    this.signupMinorTitle = localize("SIGNUP.REGISTRATION_MINOR");
    this.signupTitle = localize("SIGNUP.REGISTRATION");
  }

  ngOnInit() {
    console.log('hello from CASTING component');
    this.genders = this.taxonomyService.getVocabolary('GENDERS')

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
  private createModelView(): Promise<any> {
    const today = new Date();
    const options: ModalDialogOptions = {
      context: { list: this.genders , title: "CASTINGS.PARTICIPATION_AGENCY_SELECT_TITLE"},
      fullscreen: true,
      viewContainerRef: this.vcRef
    };
    return this.modal.showModal(SelectModalViewComponent, options);
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
        this.routerExtensions.navigate(["/user/login"], { clearHistory: true });
        alert(localize("MESSAGES.CONFIRM_EMAIL"));
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
    this.user[field]=value
  }

  textfieldEvent($event, field){
    this.user[field]=$event.object.text
  }

  goBack() {
    if(!this.isLoading) this.routerExtensions.back();
  }

}
