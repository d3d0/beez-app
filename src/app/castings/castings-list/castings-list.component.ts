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
  // items: Array<IDataItem>;

  // constructor(private itemService: DataService, private router: RouterExtensions) { }

  ngOnInit(): void {
      // this.items = this.itemService.getItems();
      console.log('hello from CastingsList Component');



  }

}
