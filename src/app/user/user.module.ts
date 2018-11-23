import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { UserRoutingModule } from "./user.routing";
import { LoginComponent } from "./login/login.component";
import { NativeScriptRouterModule } from "nativescript-angular/router";

@NgModule({
  imports: [
    NativeScriptFormsModule,
    NativeScriptCommonModule,
    UserRoutingModule
  ],
  declarations: [
    LoginComponent
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class UserModule { }
