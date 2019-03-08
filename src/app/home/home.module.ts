import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { HomeRoutingModule } from "./home.routing";
import { HomeComponent } from "./home.component";
import { SharedModule } from "../shared/shared.module";
import { SelectModalViewComponent } from "../shared/select-modal-view/select-modal-view.component";

@NgModule({
  imports: [
    NativeScriptCommonModule,
    SharedModule,
    HomeRoutingModule
  ],
  declarations: [
    HomeComponent,
    SelectModalViewComponent
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class HomeModule { }
