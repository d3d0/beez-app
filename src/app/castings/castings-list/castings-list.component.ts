import { Component, ChangeDetectionStrategy, EventEmitter, OnDestroy, Input, Output, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { TabView } from "tns-core-modules/ui/tab-view";
import { localize } from "nativescript-localize";
import { ListViewEventData } from "nativescript-ui-listview";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { Subscription } from "rxjs";
import { finalize } from "rxjs/operators";

import { CastingsService } from "../castings.service";
import { Casting } from "../casting.model";

@Component({
  selector: 'ns-castings-list',
  templateUrl: './castings-list.component.html',
  styleUrls: ['./castings-list.component.css'],
  moduleId: module.id
})

export class CastingsListComponent implements OnInit, OnDestroy {

  private _isLoading = true;
  private _castings: ObservableArray<Casting> = new ObservableArray<Casting>([]);
  private _dataSubscription: Subscription;

  // @Input() castingType: string;
  // // @Output() loading = new EventEmitter();
  // @Output() loaded = new EventEmitter();
  // @Output() updateList = new EventEmitter<boolean>();

  constructor(
    private routerExtensions: RouterExtensions,
    private castingsService: CastingsService) {}

    ngOnInit(): void {
      if (!this._dataSubscription) {
        this._isLoading = true;
        this._dataSubscription = this.castingsService.load()
            .pipe(finalize(() => this._isLoading = false))
            .subscribe((castings: Array<Casting>) => {
                this._castings = new ObservableArray(castings);
                this._isLoading = false;
            });
      }
    }
    ngOnDestroy(): void {
        if (this._dataSubscription) {
            this._dataSubscription.unsubscribe();
            this._dataSubscription = null;
        }
    }

  get castings(): ObservableArray<Casting> {
    return this._castings
  }

  public onPullToRefreshInitiated(args: ListViewEventData) {
    this.castingsService.load().subscribe(() => {
        args.object.notifyPullToRefreshFinished();
    });
  // setTimeout(function () {
  //   args.object.notifyPullToRefreshFinished()
  // }, 1000);
  }

  onCastingTap(args: ListViewEventData): void {
      const tappedCasting = args.view.bindingContext;

      this.routerExtensions.navigate(["../casting", tappedCasting.id],
          {
              animated: true,
              transition: {
                  name: "slide",
                  duration: 200,
                  curve: "ease"
              }
          });
  }

  showActivityIndicator() {
    this._isLoading = true;
    console.log('showActivityIndicator')
  }

  hideActivityIndicator() {
    console.log('hideActivityIndicator')
  }
}
