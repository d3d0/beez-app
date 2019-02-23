import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { HomeRoutingModule } from "./home.routing";
import { NativeScriptLocalizeModule } from "nativescript-localize/angular";
import { HomeComponent } from "./home.component";
import { SelectModalViewComponent } from "../shared/select-modal-view/select-modal-view.component";
import { TNSCheckBoxModule } from 'nativescript-checkbox/angular';

@NgModule({
  imports: [
    HomeRoutingModule,
    NativeScriptLocalizeModule,
    NativeScriptFormsModule,
    NativeScriptCommonModule,
    TNSCheckBoxModule
  ],
  declarations: [
    HomeComponent,
    SelectModalViewComponent
      ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class HomeModule { }
