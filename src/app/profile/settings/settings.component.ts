import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { ActivatedRoute } from "@angular/router";
import { localize } from "nativescript-localize";
import { UserService } from "../../user/user.service";
import { BackendService } from "../../shared/backend.service";
import { alert, getIconSource } from "../../shared/utils";
import { AnyTxtRecord } from 'dns';
import { PasswordService } from '../password/password.service';
import { EventData } from "tns-core-modules/data/observable";
import { GridLayout } from 'tns-core-modules/ui/layouts/grid-layout/grid-layout';
import { StackLayout } from 'tns-core-modules/ui/layouts/stack-layout/stack-layout';
import { ScrollView, ScrollEventData } from "tns-core-modules/ui/scroll-view";
import {NavigatedData, Page} from "tns-core-modules/ui/page";
import { isIOS, isAndroid } from "tns-core-modules/platform";

import {
  ApplicationEventData, exitEvent, launchEvent, on, resumeEvent,
  suspendEvent
} from "tns-core-modules/application";
import * as utils from "tns-core-modules/utils/utils";

@Component({
  selector: 'ns-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  moduleId: module.id,
})

export class SettingsComponent implements OnInit {

  @ViewChild("container", {static: false}) container: ElementRef;
  @ViewChild("vline", {static: false}) vline: ElementRef;

  getIconSource = getIconSource
  userName:string;
  userEmailNotify:any;
  isChecked:boolean;
  formValue:any;

  private page: Page;

  constructor(
    private activeRoute: ActivatedRoute,
    private routerExtension: RouterExtensions,
    private userService: UserService,
    private router: Router,
    private passwordService:PasswordService,
    page: Page
    ) {
      this.page = page;
      this.page.on("navigatingTo", this.onNavigatingTo.bind(this));
      this.page.on("navigatedTo", this.onNavigatedTo.bind(this));
    }

  ngOnInit() {
    this.userName = BackendService.user_name;
    this.userEmailNotify = BackendService.email_notify;
    
    if(this.userEmailNotify == 1){
      this.isChecked = true;
    }else{
      this.isChecked = false;
    }
    console.log('SETTINGS --->',this.userEmailNotify );
  }

  protected onNavigatingTo(arg?: NavigatedData): void {
      console.log("l☯☯☯l > onNavigatingTo");
  }

  protected onNavigatedTo(arg?: NavigatedData): void {
      console.log("l☯☯☯l > onNavigatedTo", arg.object);
      // page
      let height = this.page.getActualSize().height;
      console.log('l☯☯☯l > onLoadedGrid() > LOADED SettingsComponent Page Height:', height);
      // grid
      let griglia = this.container.nativeElement;
      console.log('l☯☯☯l > onLoadedGrid() > LOADED SettingsComponent Grid Height:', griglia.getActualSize().height);
      // console.log('l☯☯☯l > onLoadedGrid() > LOADED SettingsComponent Grid Height:', griglia.getMeasuredHeight());
      let vline = this.vline.nativeElement;
      console.log('l☯☯☯l > onLoadedGrid() > LOADED SettingsComponent Label Height:', vline.getActualSize().height);
      // console.log('l☯☯☯l > onLoadedGrid() > LOADED SettingsComponent Label Height:', vline.getMeasuredHeight());
      if (isAndroid) {
        vline.height = griglia.getActualSize().height - 96; // (24x3)
        console.log('l☯☯☯l > onLoadedGrid() > LOADED SettingsComponent Android Label Height:', vline.height);
      }
      
  }

  onLoadedGrid(args: EventData) {
    console.log('l☯☯☯l > onLoadedGrid() > LOADED SettingsComponent Scroll!');
    let grid = args.object as ScrollView;
    let height = grid.getMeasuredHeight();
    console.log('l☯☯☯l > onLoadedGrid() > LOADED SettingsComponent Scroll!',height);
  }
  onLoadedScroll(args: EventData) {
    console.log('l☯☯☯l > onLoadedGrid() > LOADED SettingsComponent Grid!');
    let grid = args.object as GridLayout;
    let height = grid.getMeasuredHeight();
    console.log('l☯☯☯l > onLoadedGrid() > LOADED SettingsComponent Grid!',height);
  }

  logout() {
    this.userService.logoff().subscribe((result) => {
      BackendService.reset();
      this.routerExtension.navigate(["/user/login"], { clearHistory: true });
    }, (error) => {
      BackendService.reset();
      this.routerExtension.navigate(["/user/login"], { clearHistory: true });
      console.log('logoff error ',error);
    });
  }
  
  onCheckedChange(checked) {
    
    this.isChecked = checked;
    console.log(checked);
    let option;
    if (this.isChecked){
      option = "1";
    }else{
      option = "0";
    }
    this.formValue = {
      "uid": BackendService.UID,
      "email_notify": option
    }
    console.log(this.formValue)
    this.pushRequest();
  }

  public goBack() {
    this.routerExtension.back({ relativeTo: this.activeRoute });
  }

  pushRequest(){
    this.passwordService.updateMail(this.formValue).subscribe(data => {
      console.log('torno da service');
      if(data) {
        console.log(data);
        //alert(localize('impostazioni aggiornate'));
        BackendService.email_notify = this.formValue.email_notify;
      }
    },
    error => {
        alert(localize(error));
    });
  }

  openUrl(arg){
    utils.openUrl(arg)
  }

  // onPwdTap($event) {
  //   console.log('stocaz');
  //   this.router.navigate(["/password"], { relativeTo: this.activeRoute })
  // }
}
