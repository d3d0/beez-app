import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { SharedModule } from "../shared/shared.module"

import { ProfileRoutingModule } from "./profile-routing.module";
import { ProfileComponent } from "./profile.component";
import { MediaComponent } from './media/media.component';
import { SettingsComponent } from "./settings/settings.component";

import { PasswordComponent } from "./password/password.component";


import { NativeScriptFormsModule } from "nativescript-angular/forms"

@NgModule({
  imports: [
    ProfileRoutingModule,
    NativeScriptCommonModule,
    SharedModule,
    NativeScriptFormsModule
  ],
  declarations: [
  ProfileComponent,
  MediaComponent,
  SettingsComponent,
  PasswordComponent
],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ProfileModule { }
