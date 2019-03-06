import { NgModule } from '@angular/core';

import { NativeScriptModule } from 'nativescript-angular/nativescript.module';

import { CastingStatusPipe } from "../castings/castings-list/casting-status.pipe";
import { CastingDetailComponent } from '../castings/casting-detail/casting-detail.component';

@NgModule({
  imports: [
    NativeScriptModule,
  ],
  declarations: [
    CastingDetailComponent,
  ],
  exports: [
    CastingDetailComponent,
    CastingStatusPipe
  ]
})
export class SharedModule {

}