import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { NativeScriptLocalizeModule } from "nativescript-localize/angular";
import { SharedModule } from "../shared/shared.module"

import { UserRoutingModule} from "./user.routing";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";

@NgModule({
  imports: [
		UserRoutingModule,
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    NativeScriptHttpClientModule,
    NativeScriptRouterModule,
    NativeScriptLocalizeModule,
    SharedModule
  ],
  declarations: [
    LoginComponent,
    SignupComponent
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class UserModule { }
