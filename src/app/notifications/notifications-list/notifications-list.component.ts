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
import { isIOS, isAndroid } from "platform" ;
import { topmost } from "tns-core-modules/ui/frame";
import { Label } from "tns-core-modules/ui/label";

declare var android: any; // <- important! avoids namespace issues

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
    console.log('☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯');
    console.log('l☯☯☯l > NotificationsListComponent > ngOnInit()');
    console.log('☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯');
    this._templateSelector = this.templateSelectorFunction;
  }

  ngOnDestroy() {
    console.log('☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯');
    console.log('l☯☯☯l > NotificationsListComponent > ngOnDestroy()');
    console.log('☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯☯');
    if (this._dataSubscription) {
      this._dataSubscription.unsubscribe();
      this._dataSubscription = null;
    }
  }

  /**
   * load()
   * carica le notifiche
   */
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

  // d3d0 fix --> refresh NotificationsListComponent RadListView component
  onLoadedRad(args: EventData) {
    this.load();
    console.log('l☯☯☯l > onLoadedRad() > LOADED NotificationsListComponent RadListView!');
  }
  onUnloadedRad(args: EventData) {
    if (this._dataSubscription) {
      this._dataSubscription.unsubscribe();
      this._dataSubscription = null;
    }
    console.log('l☯☯☯l > onUnloadedRad() > UNLOADED NotificationsListComponent RadListView!');
  }
  // d3d0 fix --> refresh NotificationsListComponent RadListView component

  goToCasting(notification){
    if(!notification.read){
      this.notificationService.setRead(notification.mid).subscribe(result=>console.log("notification.read OK ",result))
      //console.log(notification.read);
      //console.log(JSON.stringify(notification));
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

      let cardview = args.view;
      let nativecard = cardview.nativeView;
      console.log('cardview ############################################', cardview);
      console.log('nativecard ############################################', nativecard);

      if(isIOS){
        // support XCode 8
        var newcolor = new Color(0,0,0,0);
        args.ios.backgroundView.backgroundColor = newcolor.ios;
        // support XCode 11
        args.ios.backgroundColor = UIColor.clearColor; // d3d0fix
        args.ios.opaque=false; // d3d0fix
      }
      if(isAndroid){
          // DOCS:
          // https://stackoverflow.com/questions/39379394/how-to-set-the-background-transparent-to-a-nativescript-webview
          // https://stackoverflow.com/questions/54634717/cannot-set-modal-background-to-transparent-in-android
          // https://github.com/nstudio/nativescript-cardview/issues/11
          // https://stackoverflow.com/questions/2173936/how-to-set-background-color-of-a-view
          var c = new Color("#FF0000");
          nativecard.setCardBackgroundColor(c.android);
          // nativecard.setCardBackgroundColor(0x00FF00);
          // nativecard.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.parseColor("#FFFF0004")));
          // nativecard.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.CYAN));
          // nativecard.setCardBackgroundColor(new android.graphics.drawable.ColorDrawable(android.graphics.Color.TRANSPARENT));
      }

      const vista = args.object; // the object that fires the event
      if (vista) {
        let stack = vista.getViewById<View>("delete-stack"); // gets a child view by id
        if (stack) {
          if(this.counter == 1){
            //stack.text =  this.counter.toString();
            //stack.className = 'list-group-item-first';
            // stack.style.marginTop = 20; // d3d0fix
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
