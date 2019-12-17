import { Component, ViewChild, EventEmitter, ElementRef, OnInit, ViewContainerRef } from '@angular/core';
import { localize } from "nativescript-localize";
import { RouterExtensions } from "nativescript-angular/router";
import { connectionType, getConnectionType } from "connectivity";

import { User } from '../user.model'
import { UserService } from "../user.service";
import { BackendService } from "../../shared/backend.service";
import { TaxonomyService } from "../../shared/taxonomy.service";
import { openLink } from "../../shared/utils"
import { ListPicker } from "tns-core-modules/ui/list-picker";
import * as dialogsModule from "ui/dialogs";
import { ActivatedRoute, Router } from "@angular/router";

import { EventData } from "tns-core-modules/data/observable";

import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/directives/dialogs";
import { MessageModalViewComponent } from "../../components/message-modal-view/message-modal-view.component";
import { TermsModalViewComponent } from "../../components/terms-modal-view/terms-modal-view.component";

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
  public editable: boolean;
  public username: string = '';
  public username0: string = '';
  public username1: string = '';
  public username2: string = '';

  // @ViewChild('tabHighlight') tabHighlight: ElementRef;
  @ViewChild('tab1', {static: true}) tab1: ElementRef;
  @ViewChild('tab2', {static: true}) tab2: ElementRef;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private routerExtensions: RouterExtensions,
    private userService: UserService,
    private taxonomyService: TaxonomyService,
    private vcRef: ViewContainerRef,
    private modal: ModalDialogService, ) {
      this.user = new User();
      this.signupMinorTitle = localize("SIGNUP.REGISTRATION_MINOR");
      this.signupTitle = localize("SIGNUP.REGISTRATION");
  }

  ngOnInit() {
    this.tabs[0] = this.tab1.nativeElement;
    this.tabs[1] = this.tab2.nativeElement;
    this.tabs[0].className = "active"; // FIX 23/09
    // this.tabs[0].style.color = new Color("#00D796"); 
    console.log('l☯☯☯l > SignupComponent > ngOnInit() > this.isLoading', this.isLoading);
    
    // d3d0 --> imposto registrato a false 
    BackendService.registeredUser = false;
    console.log('l☯☯☯l > SignupComponent > ngOnInit() > BackendService.registeredUser', BackendService.registeredUser);
    
    // d3d0 --> imposto editable a true 
    this.editable = true;
    console.log('l☯☯☯l > SignupComponent > ngOnInit() > editable', this.editable);

    setTimeout(() => {
      this.terminiModal();
    });
  }

  public onSelectedIndexChange(index, args: EventData) {
    let previousTab = this.selectedIndex;
    if (index != this.selectedIndex) {
      // this.tabs[index].className = "active"; // FIX 23/09
      // this.tabs[this.selectedIndex].className = "not-active"; // FIX 23/09
      this.tabs[index].className = "active"; // FIX 23/09
      this.tabs[previousTab].className = "not-active"; // FIX 23/09
      this.selectedIndex = index;
    }
  }

  termini() {
    console.log('ok');
  }

  terminiModal() {
    console.log('ok');
    const options: ModalDialogOptions = {
      context: { title: localize('TERMS_TITLE'), buttonText: localize('TERMS_BUTTON')},
      fullscreen: true,
      viewContainerRef: this.vcRef
    };
    this.modal.showModal(TermsModalViewComponent, options);
  }

  selectEvent(value, field, tipo=null){
    console.log('l☯☯☯l > CastingDetailComponent > selectEvent > select value:',value);
    console.log('l☯☯☯l > CastingDetailComponent > selectEvent > select field:',field);
    console.log('l☯☯☯l > CastingDetailComponent > selectEvent > select tipo:',tipo);
    if (field) {
      // d3d0 fix --> se field è gender allora usiamo value.tid
      if(field === 'gender') {
        this.user[field]=value.tid;
        console.log('selectEvent', this.user[field]);
        console.log('selectEvent > name', value.name);
        console.log('selectEvent > tid', value.tid);
      } else {
        this.user[field]=value;
        console.log('selectEvent', this.user[field]);
        console.log('selectEvent > name', value.name);
        console.log('selectEvent > tid', value.tid);
      }

      // PATTERN: calcolo username minore
      // nomefiglio + cognomefiglio + annonascitafiglio @ beez.io
      if(field == 'date_of_birth' && tipo == 'minore') {
        let date = new Date(value);
        let year = date.getFullYear().toString().substr(-2);
        console.log('anno', year);
        this.username2 = year;
        this.username = this.username0+this.username1+this.username2+'@beez.io';
        console.log('selectEvent username >',this.username);
      }
    }
  }

  textfieldEvent(text, field){
    if(field) this.user[field]=text;
    if(field=='username') {
      console.log('textfieldEvent username');
    }
  }

  textfieldBlurEvent(text, field){
    // PATTERN: calcolo username minore
    // nomefiglio + cognomefiglio + annonascitafiglio @ beez.io
    if(field=='name') {
        if(text) {
          let cleantext = text; 
          cleantext = cleantext.replace(/\s/g,'');  
          this.username0 = cleantext.toLowerCase();
        }
        console.log('textfieldEvent tutor_name >',this.username0);
        this.username = this.username0+this.username1+this.username2+'@beez.io';
        console.log('textfieldEvent username >',this.username);
    }
    if(field=='surname') {
        if(text) {
          let cleantext = text; 
          cleantext = cleantext.replace(/\s/g,'');  
          this.username1 = cleantext.toLowerCase();
        } 
        console.log('textfieldEvent name >',this.username1);
        this.username = this.username0+this.username1+this.username2+'@beez.io';
        console.log('textfieldEvent username >',this.username);
    }
  }

  signup(evento, tipo){
    if (getConnectionType() === connectionType.none) {
      alert(localize("MESSAGES.NO_CONNECTION"));
      return;
    }

    console.log('tipo',tipo);

    // validazione del minore
    if(tipo=="minore") {
      if (!User.isValidTutorName(this.user.tutor_name)) {
        alert(localize("MESSAGES.REQUIRED_TUTOR_NAME"));
        return;
      }
      if (!User.isValidTutorSurname(this.user.tutor_surname)) {
        alert(localize("MESSAGES.REQUIRED_TUTOR_SURNAME"));
        return;
      }
      if (!User.isValidTutorDate(this.user.tutor_date_of_birth)) {
        alert(localize("MESSAGES.REQUIRED_TUTOR_DATE"));
        return;
      }
    }

    // validazione degli adulti
    if (!User.isValidName(this.user.name)) {
      alert(localize("MESSAGES.REQUIRED_NAME"));
      return;
    }
    if (!User.isValidSurname(this.user.surname)) {
      alert(localize("MESSAGES.REQUIRED_SURNAME"));
      return;
    }
    if (!User.isValidDate(this.user.date_of_birth)) {
      alert(localize("MESSAGES.REQUIRED_DATE"));
      return;
    }
    if (!User.isValidGender(this.user.gender)) {
      alert(localize("MESSAGES.REQUIRED_GENDER"));
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
    this.editable = true;

    // --> getAnonXCSFRtoken() function
    this.userService.getAnonXCSFRtoken().subscribe((result) => {

      // --> token
      BackendService.XCSFRtoken = result;
      // console.log('l☯☯☯l > LoginComponent > getAnonXCSFRtoken() > BackendService.XCSFRtoken: ', BackendService.XCSFRtoken);
      // console.log('l☯☯☯l > LoginComponent > getAnonXCSFRtoken() > this.user: ', this.user);

      // --> login() function
      this.userService.signup(this.user).subscribe((result) => {
        console.log('l☯☯☯l > UserService > signup() > result', result);
        this.isLoading = false;
        
        // d3d0 fix --> imposto editable a false 
        this.editable = false;
        this.routerExtensions.navigate(["/user/login"], { clearHistory: true });

        // d3d0 fix --> imposto registrato a true 
        BackendService.registeredUser = true;
        console.log('l☯☯☯l > UserService > signup() > BackendService.registeredUser', BackendService.registeredUser);
        
        // se è un minore la mail principale è vuota
        if(this.user.tutor_name != '' && this.user.tutor_surname != '') {
          BackendService.isMinor = true;
        } else {
          BackendService.isMinor = false;
        }
        console.log('l☯☯☯l > UserService > signup() > BackendService.isMinor', BackendService.isMinor);

        // d3d0 --> fix alert spostata in login
        // this.alertSignup(localize("MESSAGES.CONFIRM_EMAIL"));

      }, (error) => {
        BackendService.reset()
        this.isLoading = false;
        this.editable = false;
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
      this.editable = false;
      console.log('getAnonXCSFRtoken error: ',error);
    });
    console.log('l☯☯☯l > SignupComponent > signup() > this.isLoading', this.isLoading);
  }

  goBack() {
    if(!this.isLoading) this.routerExtensions.back();
  }

}
