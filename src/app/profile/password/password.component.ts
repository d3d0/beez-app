import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { ActivatedRoute } from "@angular/router";
import { BackendService } from "../../shared/backend.service";
import { alert, getIconSource } from "../../shared/utils";
import { localize } from "nativescript-localize";
import { Validators, FormBuilder, FormGroup} from '@angular/forms';
import { PasswordService } from './password.service';


@Component({
  selector: 'ns-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
  moduleId: module.id,
})

export class PasswordComponent implements OnInit {
  getIconSource = getIconSource
  signUpForm: FormGroup;
  formValue:any;
  uid:any;

  constructor(
    private activeRoute: ActivatedRoute,
    private routerExtension: RouterExtensions,
    private router: Router,
    private formBuilder:FormBuilder,
    private passwordService:PasswordService
    ) {
      this.signUpForm = this.formBuilder.group({
        oldPwd: ["", Validators.required],
        newPwd: ["", Validators.required],
        confirmPwd:["", Validators.required]
    });
    }

  ngOnInit() {

  }

  pushRequest(){
    this.passwordService.updatePwd(this.formValue).subscribe(data => {
      console.log('torno da service');
      if(data) {
        console.log(data);
        alert(localize('Password aggiornata')).then(()=> this.goBack());

      }
    },
    error => {
        alert(localize(error));
    });
  }

  private goBack(): void{
    this.routerExtension.back({ relativeTo: this.activeRoute });
  }

  save(){
    if (this.signUpForm.invalid) {
      return;
    }else{
      if(this.signUpForm.value.newPwd.length < 5){
        alert(localize("la password deve essere di almeno 6 caratteri"));
      }else{
        if(this.signUpForm.value.newPwd == this.signUpForm.value.confirmPwd){
        
          this.formValue = {
            "uid": BackendService.UID,
            "pwd":this.signUpForm.value.newPwd,
            "currentpwd":this.signUpForm.value.oldPwd
          }
  
          this.pushRequest();
          console.log(JSON.stringify(this.signUpForm.value));
        }else{
          alert(localize("le password non coincidono"));
        }
      }
      
    }
  }

  ngOnDestroy() {
    console.log('destroy');
  }

}
