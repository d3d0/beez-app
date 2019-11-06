import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { ModuleWithProviders }  from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { RecoveryComponent } from "./recovery/recovery.component";


const routes: Routes = [
  { path: "", component: LoginComponent },
  // { path: "user", redirectTo: "login", pathMatch: 'full'},
  { path: "signup", component: SignupComponent },
  { path: "login", component: LoginComponent },
  { path: "password", component: RecoveryComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class UserRoutingModule { }
