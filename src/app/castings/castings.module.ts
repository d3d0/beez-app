import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptLocalizeModule } from "nativescript-localize/angular";

import { CastingsRoutingModule } from "./castings.routing";
import { CastingsComponent } from "./castings.component";
import { CastingsListComponent } from "./castings-list/castings-list.component";
import { CastingDetailComponent } from "./casting-detail/casting-detail.component";
// import { CastingsService } from "./castings.service";

@NgModule({
  imports: [
    CastingsRoutingModule,
    NativeScriptCommonModule,
    NativeScriptLocalizeModule
  ],
  declarations: [
    CastingsComponent,
	  CastingsListComponent,
	  CastingDetailComponent
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class CastingsModule { }
