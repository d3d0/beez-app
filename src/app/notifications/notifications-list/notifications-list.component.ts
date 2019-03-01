import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ListViewEventData } from "nativescript-ui-listview";
import { RouterExtensions } from "nativescript-angular/router";
import { ActivatedRoute } from "@angular/router";
import { NotificationsService} from "../notifications.service";
import { Notification} from "../notification.model";
import { Router } from "@angular/router";

import { View } from "ui/core/view";

import {Color} from "color";
import {isIOS} from "platform" ;

@Component({
  selector: 'ns-notifications',
  templateUrl: './notifications-list.component.html',
  styleUrls: ['./notifications-list.component.css'],
  moduleId: module.id,
})
export class NotificationsListComponent implements OnInit {

  notifications:any;

  constructor(
    private activeRoute: ActivatedRoute,
    private routerExtensions: RouterExtensions,
    private router: Router,
    private store: NotificationsService) {
    store.load().subscribe(
    notifications => {
      console.log(notifications)
      this.notifications = notifications}
      )
  }

  ngOnInit() {
  	console.log('hello from Notifications component');
  }

  goToCasting(id){
    if( id )this.router.navigate(["../../castings/casting", id], { relativeTo: this.activeRoute })
  }
  // public onPullToRefreshInitiated(args: ListViewEventData) {
  //   this.store.load().subscribe(
  //   notifications => {
  //     console.log(notifications)
  //     this.notifications = notifications
  //   }
  //     )
  // }
  
  // DOCS > eliminiamo il background solo in IOS RadListView
  public onItemLoading(args: ListViewEventData){
        console.log("onItemLoading");
        if(isIOS){
            console.log(args.ios);
            var newcolor = new Color(0,0,0,0);
            args.ios.backgroundView.backgroundColor = newcolor.ios;
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
      console.log("Right swipe click");
  }
}
