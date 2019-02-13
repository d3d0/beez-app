import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { ActivatedRoute } from "@angular/router";

import { UserService } from "../../user/user.service";
import { BackendService } from "../../shared/backend.service";

@Component({
  selector: 'ns-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  moduleId: module.id,
})

export class SettingsComponent implements OnInit {

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private routerExtension: RouterExtensions,
    private userService: UserService
    ) {}

  ngOnInit() {}

  logout() {
    this.userService.logoff().subscribe((result) => {
        BackendService.reset();
        this.router.navigate(["/user/login"]);
      }, (error) => {
        BackendService.reset();
        this.router.navigate(["/user/login"]);
        console.log('logoff error ',error);
      });
  }
  
  public goBack() {
    this.routerExtension.back({ relativeTo: this.activeRoute });
  }
}
