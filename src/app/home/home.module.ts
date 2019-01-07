import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { HomeRoutingModule } from "./home.routing";
import { NativeScriptLocalizeModule } from "nativescript-localize/angular";
import { HomeComponent } from "./home.component";
import { SettingsComponent } from "../settings/settings.component";

@NgModule({
  imports: [
    HomeRoutingModule,
    NativeScriptLocalizeModule,
    NativeScriptFormsModule,
    NativeScriptCommonModule
  ],
  declarations: [
    HomeComponent
      ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class HomeModule { }
