import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptLocalizeModule } from "nativescript-localize/angular";

import { UserRoutingModule} from "./user.routing";
import { LoginComponent } from "./login/login.component";
import { SigninComponent } from "./signin/signin.component";

@NgModule({
  imports: [
		UserRoutingModule,
    NativeScriptCommonModule,
    NativeScriptLocalizeModule,
    NativeScriptRouterModule
  ],
  declarations: [
    LoginComponent,
    SigninComponent
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class UserModule { }
