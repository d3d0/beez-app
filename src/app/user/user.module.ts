import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";

import { userRouting } from "./user.routing";
import { LoginComponent } from "./login/login.component";

@NgModule({
  imports: [
    userRouting,
    NativeScriptFormsModule,
    NativeScriptCommonModule
  ],
  declarations: [
    LoginComponent
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class UserModule { }
