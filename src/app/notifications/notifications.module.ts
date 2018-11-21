import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptLocalizeModule } from "nativescript-localize/angular";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";

import { NotificationsComponent } from "./notifications.component";
import { NotificationsRoutingModule } from "./notifications-routing.module";

@NgModule({
  imports: [
    NotificationsRoutingModule,
    NativeScriptCommonModule,
    NativeScriptLocalizeModule,
    NativeScriptUIListViewModule
  ],
  declarations: [
  NotificationsComponent
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class NotificationsModule { }
