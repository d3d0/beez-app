import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptLocalizeModule } from "nativescript-localize/angular";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { CastingsRoutingModule } from "./castings.routing";
import { CastingsComponent } from "./castings.component";
import { CastingsListComponent } from "./castings-list/castings-list.component";

import { CastingsService} from "./castings.service";

@NgModule({
  imports: [
    NativeScriptCommonModule,
    NativeScriptLocalizeModule,
    NativeScriptUIListViewModule,
    NativeScriptRouterModule,
    CastingsRoutingModule
  ],
  providers: [
  CastingsService
  ],
  declarations: [
    CastingsComponent,
    CastingsListComponent
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class CastingsModule { }
