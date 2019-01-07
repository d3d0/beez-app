import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
  selector: 'ns-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  moduleId: module.id,
})
export class SettingsComponent implements OnInit {

  constructor(private router: Router, private routerExtensions: RouterExtensions) { }

  ngOnInit() {
  }

  logout() {
    this.router.navigate(["/user/login"]);
  }
  
  public goBack() {
    console.log('goback')
    this.routerExtensions.back();
  }
}
