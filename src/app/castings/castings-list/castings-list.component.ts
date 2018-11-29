import { Component, ChangeDetectionStrategy, EventEmitter, Input, Output, AfterViewInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { TabView } from "tns-core-modules/ui/tab-view";
import { localize } from "nativescript-localize";

@Component({
  selector: 'ns-castings-list',
  templateUrl: './castings-list.component.html',
  styleUrls: ['./castings-list.component.css'],
  moduleId: module.id,
	changeDetection: ChangeDetectionStrategy.OnPush
})

export class CastingsListComponent implements AfterViewInit {
	@Input() showDeleted: boolean;
	@Input() type;
	@Output() loading = new EventEmitter();
	@Output() loaded = new EventEmitter();
	
	constructor() {
      // this.store = store;
  }

  ngAfterViewInit() {
      this.load();
  }
  load() {
    this.loading.next("");
    // this.store.load()
      // .subscribe(
      //   () => {
      //     this.loaded.next("");
      //     this.listLoaded = true;
      //   },
      //   () => {
      //     alert("An error occurred loading your grocery list.");
      //   }
      // );
  }
  showActivityIndicator() {
    // this.isLoading = true;
    console.log('showActivityIndicator')
  }

  hideActivityIndicator() {
    console.log('hideActivityIndicator')
    // this.isLoading = false;
  }
}
