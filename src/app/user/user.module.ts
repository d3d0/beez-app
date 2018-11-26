import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { UserRoutingModule} from "./user.routing";
import { LoginComponent } from "./login/login.component";
import { SigninComponent } from "./signin/signin.component";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptLocalizeModule } from "nativescript-localize/angular";

@NgModule({
  imports: [
		UserRoutingModule,
    NativeScriptLocalizeModule,
    NativeScriptFormsModule,
    NativeScriptCommonModule
  ],
  declarations: [
    LoginComponent,
    SigninComponent
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class UserModule { }
