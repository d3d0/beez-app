import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptLocalizeModule } from "nativescript-localize/angular";

import { ProfileRoutingModule } from "./profile-routing.module";
import { ProfileComponent } from "./profile.component";
import { MediaComponent } from './media/media.component';
import { DetailsComponent } from './details/details.component';
import { InfoComponent } from './info/info.component';
import { ContactsComponent } from './contacts/contacts.component';
import { SettingsComponent } from "./settings/settings.component";


@NgModule({
  imports: [
    ProfileRoutingModule,
    NativeScriptCommonModule,
    NativeScriptLocalizeModule
  ],
  declarations: [
  ProfileComponent,
  MediaComponent,
  DetailsComponent,
  InfoComponent,
  ContactsComponent,
  SettingsComponent
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ProfileModule { }
