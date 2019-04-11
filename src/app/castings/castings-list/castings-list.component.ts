 import { Component, ChangeDetectionStrategy, EventEmitter, OnDestroy, Input, Output, OnInit } from "@angular/core";
 import { RouterExtensions } from "nativescript-angular/router";
 import { ActivatedRoute } from "@angular/router";
 import { TabView } from "tns-core-modules/ui/tab-view";
 import { localize } from "nativescript-localize";
 import { ListViewEventData } from "nativescript-ui-listview";
 import { ObservableArray } from "tns-core-modules/data/observable-array";
 import { Subscription } from "rxjs";
 import { finalize } from "rxjs/operators";
 import { Router } from "@angular/router";
 import * as utils from "utils/utils";
 declare var UIColor: any;
 import { Color } from "color";

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
   private _templateSelector: (item, index: number, items: any) => string;

   @Input() castingType: string;

   constructor(
     private router: Router,
     private activeRoute: ActivatedRoute,
     private routerExtensions: RouterExtensions,
     private castingsService: CastingsService) {
   }

   ngOnInit(): void {
     this._templateSelector = this.templateSelectorFunction;
     this.load()
   }

   load(){
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

   ngOnDestroy() {
     if (this._dataSubscription) {
       this._dataSubscription.unsubscribe();
       this._dataSubscription = null;
     }
   }

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
       this.castingsService.load()
       .pipe(finalize(() => this._isLoading = false))
       .subscribe((castings: Array<Casting>) => {
         this._castings = new ObservableArray(castings);
         this._isLoading = false;
         console.log(this._castings)
         args.object.notifyPullToRefreshFinished()

       });
     },500)
   }

   public onCastingTap(castingType :string, id :string){
       this.router.navigate(["../casting/"+castingType, id], { relativeTo: this.activeRoute })
   }

   // The following trick makes the background color of each cell
   // in the UITableView transparent as it’s created.
   makeBackgroundTransparent(args) {
     let cell = args.ios;
     if (cell) {
       // support XCode 8
       var newcolor = new Color(0,0,0,0);
       args.ios.backgroundView.backgroundColor = newcolor.ios;
       cell.backgroundColor = utils.ios.getter(UIColor, UIColor.clearColor);
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
