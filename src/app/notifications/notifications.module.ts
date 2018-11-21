import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptLocalizeModule } from "nativescript-localize/angular";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";

import { NotificationsListComponent } from "./notifications-list/notifications-list.component";
import { NotificationsRoutingModule } from "./notifications-routing.module";

@NgModule({
  imports: [
    NotificationsRoutingModule,
    NativeScriptCommonModule,
    NativeScriptLocalizeModule,
    NativeScriptUIListViewModule
  ],
  declarations: [
  NotificationsListComponent
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class NotificationsModule { }
