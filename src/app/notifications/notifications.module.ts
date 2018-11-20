import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptLocalizeModule } from "nativescript-localize/angular";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { NotificationsComponent } from "./notifications.component";
import { NotificationsRoutingModule } from "./notifications-routing.module";

@NgModule({
  imports: [
    NotificationsRoutingModule,
    NativeScriptCommonModule,
    NativeScriptModule,
    NativeScriptLocalizeModule
  ],
  declarations: [
  NotificationsComponent
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class NotificationsModule { }
