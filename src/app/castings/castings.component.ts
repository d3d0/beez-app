import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from "nativescript-angular/router";
import { DataService, IDataItem } from "../core/data.service";
import { TabView } from "tns-core-modules/ui/tab-view";
import { localize } from "nativescript-localize";

@Component({
  selector: 'ns-castings',
  templateUrl: './castings.component.html',
  styleUrls: ['./castings.component.css'],
  moduleId: module.id,
})
export class CastingsComponent implements OnInit {
  items: Array<IDataItem>;

  constructor(private itemService: DataService, private router: RouterExtensions) { }

  ngOnInit(): void {
      this.items = this.itemService.getItems();
      console.log(localize("LANG"));

  }

}
