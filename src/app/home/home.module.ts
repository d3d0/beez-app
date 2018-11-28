import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { HomeRoutingModule } from "./home.routing";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptLocalizeModule } from "nativescript-localize/angular";
import { HomeComponent } from "./home.component";
import { CastingDetailComponent } from "../castings/casting-detail/casting-detail.component";

@NgModule({
  imports: [
    HomeRoutingModule,
    NativeScriptLocalizeModule,
    NativeScriptFormsModule,
    NativeScriptCommonModule
  ],
  declarations: [
  HomeComponent,
  CastingDetailComponent
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class HomeModule { }
