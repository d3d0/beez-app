import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptLocalizeModule } from "nativescript-localize/angular";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";

import { CastingsRoutingModule } from "./castings.routing";
import { CastingsComponent } from "./castings.component";
import { CastingsListComponent } from "./castings-list/castings-list.component";
import { CastingDetailComponent } from "./casting-detail/casting-detail.component";

import { CastingStatusPipe } from "./castings-list/casting-status.pipe";

@NgModule({
  imports: [
    CastingsRoutingModule,
    NativeScriptCommonModule,
    NativeScriptLocalizeModule,
    NativeScriptUIListViewModule
  ],
  declarations: [
    CastingsComponent,
    CastingsListComponent,
	  CastingDetailComponent,
    CastingStatusPipe
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class CastingsModule { }
