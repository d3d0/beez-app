import { Component, OnInit } from '@angular/core';
import { ListViewEventData } from "nativescript-ui-listview";

import { NotificationsService} from "../notifications.service";
import { Notification} from "../notification.model";

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
    }, 1000);  }
  }
