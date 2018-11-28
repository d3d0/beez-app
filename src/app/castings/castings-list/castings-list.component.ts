import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from "nativescript-angular/router";
import { TabView } from "tns-core-modules/ui/tab-view";
import { localize } from "nativescript-localize";

@Component({
  selector: 'ns-castings',
  templateUrl: './castings-list.component.html',
  styleUrls: ['./castings-list.component.css'],
  moduleId: module.id,
})

export class CastingsListComponent implements OnInit {
  ngOnInit(): void {
      console.log('hello from CastingsList Component');
  }
}
