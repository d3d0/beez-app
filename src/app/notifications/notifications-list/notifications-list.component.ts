import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ListViewEventData } from "nativescript-ui-listview";

import { NotificationsService} from "../notifications.service";
import { Notification} from "../notification.model";

import { View } from "ui/core/view";

@Component({
  selector: 'ns-notifications',
  templateUrl: './notifications-list.component.html',
  styleUrls: ['./notifications-list.component.css'],
  moduleId: module.id,
})
export class NotificationsListComponent implements OnInit {

  // @ViewChild('myCardView') myCardView: ElementRef;
  // @ViewChild('myListView') myListView: ElementRef;

  notifications: Notification[];

  constructor(store: NotificationsService) {
    this.notifications = store.load();
  }
  ngOnInit() {
  	console.log('hello from Notifications component');
    // let cardInstance = this.myCardView.nativeElement;
    // cardInstance.setBackgroundColor(Color."#F0C");
    // let radInstance = this.myListView.nativeElement;
    // radInstance.ListViewElement.DrawFill = false;
  }

  // onItemLoading(args){
  //       console.log("onItemLoading");
  //       if(isIOS){
  //           console.log(args.ios);
  //           var newcolor = new Color(20,255,0,0);
  //           args.ios.backgroundView.backgroundColor = newcolor.ios;
  //       }
  //
  //   }

  public onPullToRefreshInitiated(args: ListViewEventData) {
    setTimeout(function () {
      console.log(args)
      args.object.notifyPullToRefreshFinished()
    }, 1000);
  }

  public onSwipeCellStarted(args: ListViewEventData) {
    const swipeLimits = args.data.swipeLimits;
    const swipeView = args['object'];
    //const leftItem = swipeView.getViewById<View>('mark-view');
    const rightItem = swipeView.getViewById<View>('delete-view');
    swipeLimits.left = 0;
    swipeLimits.right = rightItem.getMeasuredWidth();
    swipeLimits.threshold = rightItem.getMeasuredWidth() / 2;
  }

  // public onLeftSwipeClick(args: ListViewEventData) {
  //     console.log("Left swipe click");
  //     this.listViewComponent.listView.notifySwipeToExecuteFinished();
  // }
  //
  // public onRightSwipeClick(args) {
  //     console.log("Right swipe click");
  //     this.dataItems.splice(this.dataItems.indexOf(args.object.bindingContext), 1);
  // }
}
