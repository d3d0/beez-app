import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptLocalizeModule } from "nativescript-localize/angular";

import { ProfileComponent } from "./profile.component";
import { ProfileRoutingModule } from "./profile-routing.module";

@NgModule({
  imports: [
    ProfileRoutingModule,
    NativeScriptCommonModule,
    NativeScriptLocalizeModule
  ],
  declarations: [
  ProfileComponent
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ProfileModule { }
