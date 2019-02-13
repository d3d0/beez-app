import { Component, ChangeDetectionStrategy, ChangeDetectorRef, EventEmitter, Input, Output, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { TabView } from "tns-core-modules/ui/tab-view";
import { localize } from "nativescript-localize";
import { ListViewEventData } from "nativescript-ui-listview";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { Subscription } from "rxjs";
import { finalize } from "rxjs/operators";

import { Casting} from "../casting.model";

@Component({
  selector: 'ns-castings-list',
  templateUrl: './castings-list.component.html',
  styleUrls: ['./castings-list.component.css'],
  moduleId: module.id
})

export class CastingsListComponent  {

  private _numberOfAddedItems;
  private _isLoading = true;

  @Input() castings : string[];
  @Input() castingType: string;
  @Output() loading = new EventEmitter();
  @Output() loaded = new EventEmitter();

  constructor(
    private routerExtensions: RouterExtensions,
    private _changeDetectionRef: ChangeDetectorRef) {
  }

  public onPullToRefreshInitiated(args: ListViewEventData) {
    // const that = new WeakRef(this);
    // setTimeout(function () {
      //   const initialNumberOfItems = that.get()._numberOfAddedItems;
      //   for (let i = that.get()._numberOfAddedItems; i < initialNumberOfItems + 2; i++) {
        //     if (i > posts.names.length - 1) {
          //       break;
          //     }
          //     const imageUri = androidApplication ? posts.images[i].toLowerCase() : posts.images[i];

          //     that.get()._castings.splice(0, 0, new Casting(i, posts.names[i], "This is item description", posts.titles[i], posts.text[i], "res://" + imageUri));
          //     that.get()._numberOfAddedItems++;
          //   }
          //   const listView = args.object;
          //   listView.notifyPullToRefreshFinished();
          // }, 1000);
        }
        showActivityIndicator() {
          this._isLoading = true;
          console.log('showActivityIndicator')
        }

        hideActivityIndicator() {
          console.log('hideActivityIndicator')
        }
      }
