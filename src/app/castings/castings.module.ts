import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptLocalizeModule } from "nativescript-localize/angular";

import { CastingsComponent } from "./castings.component";

@NgModule({
  imports: [
    NativeScriptCommonModule,
    NativeScriptLocalizeModule
  ],
  declarations: [
	  CastingsComponent
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class CastingsModule { }
