import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { HomeRoutingModule } from "./home.routing";
import { HomeComponent } from "./home.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  imports: [
    NativeScriptCommonModule,
    SharedModule,
    HomeRoutingModule
  ],
  declarations: [
    HomeComponent,
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class HomeModule { }
