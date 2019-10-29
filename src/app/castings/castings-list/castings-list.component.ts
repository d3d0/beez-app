import { Component, ViewChild, ElementRef, ChangeDetectionStrategy, EventEmitter, OnDestroy, Input, Output, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { ActivatedRoute } from "@angular/router";
import { TabView } from "tns-core-modules/ui/tab-view";
import { localize } from "nativescript-localize";
import { ListViewEventData, RadListView } from "nativescript-ui-listview";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { EventData } from "tns-core-modules/data/observable";
import { Page } from "tns-core-modules/ui/page";

import { Subscription } from "rxjs";
import { finalize } from "rxjs/operators";
import { Router } from "@angular/router";
import * as utils from "utils/utils";
declare var UIColor: any;
import { Color } from "color";

import { CastingsService } from "../castings.service";
import { Casting } from "../casting.model";

import {isIOS, isAndroid} from "tns-core-modules/platform";

declare var android: any; // <- important! avoids namespace issues

@Component({
  selector: 'ns-castings-list',
  templateUrl: './castings-list.component.html',
  styleUrls: ['./castings-list.component.scss'],
  moduleId: module.id
})

export class CastingsListComponent implements OnInit, OnDestroy {

  @ViewChild('loader', {static: true}) loader: ElementRef;
  private _loader;
  private _defaultIsVisible = false;
  private _isLoading = true;
  private _castings: ObservableArray<Casting> = new ObservableArray<Casting>([]);
  private _dataSubscription: Subscription;
  private _templateSelector: (item, index: number, items: any) => string;

  @Input() castingType: string;
  @Input() refresh: number;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private routerExtensions: RouterExtensions,
    private castingsService: CastingsService) {
  }

  ngOnInit(): void {
    // console.log('CastingsListComponent ngOnInit!');
    this._templateSelector = this.templateSelectorFunction;
    this._loader = this.loader.nativeElement;
    console.log('Loading loader', this._loader);
    this.load();
  }

  ngOnDestroy() {
    // console.log('CastingsListComponent ngOnDestroy!');
    if (this._dataSubscription) {
      this._dataSubscription.unsubscribe();
      this._dataSubscription = null;
    }
  }
  

  load(){
    if (!this._dataSubscription) {
      this._isLoading = true;
      this._dataSubscription = this.castingsService.load().pipe(finalize(() => this._isLoading = false)).subscribe((castings: Array<Casting>) => {
        // console.log('Loading castings', castings);
        this._castings = new ObservableArray(castings);
        this._isLoading = false;
        this._defaultIsVisible = true;
        // this._loader.visibility = 'collapse';
      });
    }
  }


  // d3d0 fix --> refresh RadListView component
  // docs --> https://stackoverflow.com/questions/45855673/angular2-destroy-current-component-completely
  onLoadedRad(args: EventData) {
    this.load();
    // let radlist = <RadListView>args.object;
    // let page: Page = radlist.page;
    // console.log('LOADED RadListView ############################################', radlist);
    console.log('l☯☯☯l > LOADED RadListView!', this.refresh);
  }
  onUnloadedRad(args: EventData) {
    if (this._dataSubscription) {
      this._dataSubscription.unsubscribe();
      this._dataSubscription = null;
    }
    // let radlist = <RadListView>args.object;
    // let page: Page = radlist.page;
    // console.log('UNLOADED RadListView ############################################', radlist);
    console.log('l☯☯☯l > UNLOADED RadListView!', this.refresh);
  }
  // d3d0 fix --> refresh RadListView component

  get castings(): ObservableArray<Casting> {
    return this._castings
  }

  public templateSelectorFunction = (item: Casting, index: number, items: any) => {
    if( !item.id ) return "empty";
    return "default";
  }

  get templateSelector(): (item: any, index: number, items: any) => string {
    return this._templateSelector;
  }

  set templateSelector(value: (item: any, index: number, items: any) => string) {
    this._templateSelector = value;
  }

  public onPullToRefreshInitiated(args: ListViewEventData) {
    setTimeout(()=>{
      this.castingsService.load().pipe(finalize(() => this._isLoading = false)).subscribe((castings: Array<Casting>) => {
      console.log('************ castings', castings);
        this._castings = new ObservableArray(castings);
        this._isLoading = false;
        args.object.notifyPullToRefreshFinished()
      });
    },500)
  }

  onCastingTap(args: ListViewEventData): void {
    const tappedCasting = args.view.bindingContext;
    if(tappedCasting.id)
      this.router.navigate(["../casting", tappedCasting.id], { relativeTo: this.activeRoute })
  }

  // The following trick makes the background color of each cell
  // in the UITableView transparent as it’s created.
  makeBackgroundTransparent(args) {
    if (args.ios) {
      // support XCode 8
      var newcolor = new Color(0,0,0,0);
      args.ios.backgroundView.backgroundColor = newcolor.ios;
      // support XCode 11
      args.ios.backgroundView.backgroundColor = UIColor.clearColor; // d3d0fix
      args.ios.opaque=false; // d3d0fix
      // FIX 23/09
      // cell.backgroundColor = utils.ios.getter(UIColor, UIColor.clearColor);
    }
    if(args.android){
        // non funziona ...
    }
  }

  showActivityIndicator() {
    this._isLoading = true;
    console.log('showActivityIndicator')
  }

  hideActivityIndicator() {
    console.log('hideActivityIndicator')
  }
}
