import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { CastingsRoutingModule } from "./castings.routing";
import { CastingsComponent } from "./castings.component";
import { CastingsListComponent } from "./castings-list/castings-list.component";
import { SharedModule } from "../shared/shared.module";

import { CastingsService} from "./castings.service";

@NgModule({
  imports: [
    NativeScriptCommonModule,
    NativeScriptUIListViewModule,
    NativeScriptRouterModule,
    CastingsRoutingModule,
    SharedModule
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
