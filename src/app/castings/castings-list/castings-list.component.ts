import { Component, ChangeDetectionStrategy, EventEmitter, Input, Output, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { TabView } from "tns-core-modules/ui/tab-view";
import { localize } from "nativescript-localize";
import { ListViewEventData } from "nativescript-ui-listview";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { Subscription } from "rxjs";
import { finalize } from "rxjs/operators";

import { CastingsService} from "../castings.service";
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

  @Input() castings : Casting[];
  @Input() castingType: string;
  // @Output() loading = new EventEmitter();
  @Output() loaded = new EventEmitter();
  // @Output() updateList = new EventEmitter<boolean>();

  constructor(
    private routerExtensions: RouterExtensions,
    private castingsService: CastingsService) {
  }
    get castingsList(){
      return this.castings
    }

  public onPullToRefreshInitiated(args: ListViewEventData) {
        this.castingsService.load().subscribe(() => {
            args.object.notifyPullToRefreshFinished();
        });
    // setTimeout(function () {
    //   args.object.notifyPullToRefreshFinished()
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
