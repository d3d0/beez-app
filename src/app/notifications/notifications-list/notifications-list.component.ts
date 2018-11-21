import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ns-notifications',
  templateUrl: './notifications-list.component.html',
  styleUrls: ['./notifications-list.component.css'],
  moduleId: module.id,
})
export class NotificationsListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  	console.log('hello from Notifications component');
  }

}
