import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { ActivatedRoute } from "@angular/router";
import { BackendService } from "../../shared/backend.service";
import { alert, getIconSource } from "../../shared/utils";
import { localize } from "nativescript-localize";
import { Validators, FormBuilder, FormGroup} from '@angular/forms';
import { RecoveryService } from './recovery.service';


@Component({
  selector: 'ns-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.scss'],
  moduleId: module.id,
})

export class RecoveryComponent implements OnInit {
  getIconSource = getIconSource
  recoveryForm: FormGroup;
  formValue:any;
  uid:any;

  constructor(
    private activeRoute: ActivatedRoute,
    private routerExtension: RouterExtensions,
    private router: Router,
    private formBuilder:FormBuilder,
    private recoveryService:RecoveryService
    ) {
      this.recoveryForm = this.formBuilder.group({
        username: ["", Validators.required]
    });
    }

  ngOnInit() {

  }

  pushRequest(name){
    this.recoveryService.recoveryPwd(name).subscribe(data => {
      console.log('torno da service');
      if(data) {
        console.log(data);
        alert(localize('Ti abbiamo inviato una mail con le istruzioni per il recupero della password.')).then(()=> this.goBack());
      }
    },
    error => {
        alert(localize('username non riconosciuto'));
    });
  }

  private goBack(): void{
    this.routerExtension.back({ relativeTo: this.activeRoute });
  }

  save(){
    if (this.recoveryForm.invalid) {
      return
    }else{
      this.pushRequest(this.recoveryForm.value.username);
      console.log(this.recoveryForm.value.username);
    }

  }
      
  

  ngOnDestroy() {
    console.log('destroy');
  }

}
