import { NgModule } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptLocalizeModule } from "nativescript-localize/angular";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { CastingStatusPipe } from "../castings/castings-list/casting-status.pipe";
import { CastingDetailComponent } from '../castings/casting-detail/casting-detail.component';

@NgModule({
  imports: [
    NativeScriptCommonModule,
    NativeScriptLocalizeModule,
    NativeScriptFormsModule
  ],
  declarations: [
    CastingDetailComponent,
    CastingStatusPipe
  ],
  exports: [
    CastingStatusPipe,
    CastingDetailComponent,
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    NativeScriptLocalizeModule
  ]
})
export class SharedModule { }