import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ListViewEventData } from "nativescript-ui-listview";

import { NotificationsService} from "../notifications.service";
import { Notification} from "../notification.model";

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

  notifications: Notification[];

  constructor(store: NotificationsService) {
    this.notifications = store.load();
  }
  ngOnInit() {
  	console.log('hello from Notifications component');
  }

  public onPullToRefreshInitiated(args: ListViewEventData) {
    setTimeout(function () {
      console.log(args)
      args.object.notifyPullToRefreshFinished()
    }, 1000);
  }

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
