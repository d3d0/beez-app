import { Component, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { RadListView, SwipeActionsEventData, ListViewEventData } from "nativescript-ui-listview";
import { RouterExtensions } from "nativescript-angular/router"; import { ActivatedRoute } from "@angular/router";
import { NotificationsService} from "../notifications.service";
import { Notification} from "../notification.model";
import { EventData } from "tns-core-modules/data/observable";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { View } from "ui/core/view";
import { Color } from "color";
import { isIOS } from "platform" ;
import { topmost } from "tns-core-modules/ui/frame";
import { Label } from "tns-core-modules/ui/label";

@Component({
  selector: 'ns-notifications',
  templateUrl: './notifications-list.component.html',
  styleUrls: ['./notifications-list.component.scss'],
  moduleId: module.id,
})
export class NotificationsListComponent implements OnInit, OnDestroy {

  private counter: number;
  private _cardIsVisible = false;
  private _isLoading = true;
  private _dataSubscription: Subscription;
  private _templateSelector: (item, index: number, items: any) => string;
  notifications: any;

  @ViewChild("delete-view", {static: false}) deleteView: View;

  constructor(
    private activeRoute: ActivatedRoute,
    private routerExtensions: RouterExtensions,
    private router: Router,
    private notificationService: NotificationsService) {
    this.counter = 0;
    this.load();
    
  }

  ngOnInit() {
    this._templateSelector = this.templateSelectorFunction;
    console.log('hello from Notifications component');
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
      this._cardIsVisible = false;

      this._dataSubscription = this.notificationService.load().subscribe( notifications => {
        this.notifications = notifications;
        
        this._isLoading = false;
        this._cardIsVisible = true;
        
      });
    }
  }

  // d3d0 fix --> refresh RadListView component
  onLoadedRad(args: EventData) {
    this.load();
    console.log('LOADED NotificationsListComponent RadListView ############################################');
  }
  onUnloadedRad(args: EventData) {
    if (this._dataSubscription) {
      this._dataSubscription.unsubscribe();
      this._dataSubscription = null;
    }
    console.log('UNLOADED NotificationsListComponent RadListView ############################################');
  }
  // d3d0 fix --> refresh RadListView component

  goToCasting(notification){
    if(!notification.read){
      this.notificationService.setRead(notification.mid).subscribe(result=>console.log("notification.read OK ",result))
    }
    if(notification.message_type == "audition_talent_was_not_selected") {
      return
    }
    this.router.navigate(["../casting", notification.nid], { relativeTo: this.activeRoute })
  }

  public onPullToRefreshInitiated(args: ListViewEventData) {
    setTimeout(()=>{
      this.notificationService.load().subscribe( notifications => {
        this.notifications = notifications;
        args.object.notifyPullToRefreshFinished()
      })},
    500)
    }

    public templateSelectorFunction = (item:any, index: number, items: any) => {
      if( item == "empty" ) return "empty"
        else return "default";
    }
    get templateSelector(): (item: any, index: number, items: any) => string {
      return this._templateSelector;
    }
    set templateSelector(value: (item: any, index: number, items: any) => string) {
      this._templateSelector = value;
    }

    // DOCS > eliminiamo il background solo in IOS RadListView
    public onItemLoading(args: ListViewEventData, items) {
      this.counter++;
      // console.log("onItemLoading");
      if(isIOS){
        var newcolor = new Color(0,0,0,0);
        args.ios.backgroundView.backgroundColor = newcolor.ios;
      }
      const vista = args.object; // the object that fires the event
      if (vista) {
        let stack = vista.getViewById<View>("delete-stack"); // gets a child view by id
        if (stack) {
          if(this.counter == 1){
            //stack.text =  this.counter.toString() ;
            //stack.className = 'list-group-item-first';
            stack.style.marginTop = 20;
          }
        }
      }
    }

    // DOCS > implementazione swipe in base a larghezza di swipe template
    public onSwipeCellStarted(args: ListViewEventData) {
      const swipeLimits = args.data.swipeLimits;
      const swipeView = args['object'];
      const rightItem = swipeView.getViewById<View>('delete-view');
      swipeLimits.left = 0;
      swipeLimits.right = rightItem.getMeasuredWidth();
      swipeLimits.threshold = rightItem.getMeasuredWidth() / 2;
    }

    // DOCS > funzione per eliminare la notifica
    public onRightSwipeClick(args) {
      // console.log("args.object.bindingContext",args.object.bindingContext)
      let data = this.notifications.splice(this.notifications.indexOf(args.object.bindingContext), 1)
      this.notificationService.delete(data[0].mid).subscribe(result=>console.log(result))
    }

  }
