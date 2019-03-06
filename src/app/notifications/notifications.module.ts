import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";
import { SharedModule } from "../shared/shared.module";

import { NotificationsListComponent } from "./notifications-list/notifications-list.component";
import { NotificationsRoutingModule } from "./notifications.routing"
import { NotificationsService} from "./notifications.service";


@NgModule({
  imports: [
    NotificationsRoutingModule,
    NativeScriptCommonModule,
    NativeScriptUIListViewModule,
    SharedModule
  ],
  providers:[
  NotificationsService
  ],
  declarations: [
  NotificationsListComponent
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class NotificationsModule { }
