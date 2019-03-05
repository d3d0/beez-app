import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { RadListView, SwipeActionsEventData, ListViewEventData } from "nativescript-ui-listview";
import { RouterExtensions } from "nativescript-angular/router"; import { ActivatedRoute } from "@angular/router";
import { NotificationsService} from "../notifications.service";
import { Notification} from "../notification.model";
import { Router } from "@angular/router";
import { View } from "ui/core/view";
import {Color} from "color";
import {isIOS} from "platform" ;
import { topmost } from "tns-core-modules/ui/frame";

@Component({
  selector: 'ns-notifications',
  templateUrl: './notifications-list.component.html',
  styleUrls: ['./notifications-list.component.css'],
  moduleId: module.id,
})
export class NotificationsListComponent implements OnInit {

  notifications:any;
  @ViewChild("delete-view") deleteView: View;

  constructor(
    private activeRoute: ActivatedRoute,
    private routerExtensions: RouterExtensions,
    private router: Router,
    private notificationService: NotificationsService) {
    notificationService.load().subscribe(
      notifications => {
        this.notifications = notifications}
        )
  }

  ngOnInit() {
  	console.log('hello from Notifications component');
  }

  goToCasting(notification){
 if (!notification.read) this.notificationService.setRead(notification.mid).subscribe(result=>console.log("notification.read OK ",result))
    if( notification.message_type =! "audition_talent_was_not_selected") {
      this.router.navigate(["../castings", notification.nid], { relativeTo: this.activeRoute }) 
    }
        // this.router.navigate(['./', { outlets: { castingsTab: ['casting', notification.id] } }], { relativeTo: this.activeRoute })
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
        // console.log("onItemLoading");
        if(isIOS){
          // console.log(args.ios);
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
        // console.log("args.object.bindingContext",args.object.bindingContext)
        let data = this.notifications.splice(this.notifications.indexOf(args.object.bindingContext), 1)
        this.notificationService.delete(data[0].mid).subscribe(result=>console.log(result)) }
    }
