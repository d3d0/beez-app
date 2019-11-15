import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { ActivatedRoute } from "@angular/router";
import { localize } from "nativescript-localize";
import { UserService } from "../../user/user.service";
import { BackendService } from "../../shared/backend.service";
import { alert, getIconSource } from "../../shared/utils";
import { AnyTxtRecord } from 'dns';
import { PasswordService } from '../password/password.service';
import * as utils from "tns-core-modules/utils/utils";


@Component({
  selector: 'ns-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  moduleId: module.id,
})

export class SettingsComponent implements OnInit {
  getIconSource = getIconSource
  userName:string;
  userEmailNotify:any;
  isChecked:boolean;
  formValue:any;

  constructor(
    private activeRoute: ActivatedRoute,
    private routerExtension: RouterExtensions,
    private userService: UserService,
    private router: Router,
    private passwordService:PasswordService
    ) {
      
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
