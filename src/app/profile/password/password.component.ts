import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "../../user/user.service";
import { BackendService } from "../../shared/backend.service";
import { alert, getIconSource } from "../../shared/utils";
import { User } from '../../user/user.model';

@Component({
  selector: 'ns-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
  moduleId: module.id,
})

export class PasswordComponent implements OnInit {
  user: User;
  getIconSource = getIconSource

  constructor(
    private activeRoute: ActivatedRoute,
    private routerExtension: RouterExtensions,
    private userService: UserService,
    private router: Router
    ) {

    }

  ngOnInit() {}

  save(oldPwd,newPwd,Confirm){
    console.log('Old ',oldPwd + ' New ',newPwd + ' confirm ',Confirm);
  }
  
}
