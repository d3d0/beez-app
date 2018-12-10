import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { ModuleWithProviders }  from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";

const routes: Routes = [
  // { path: "", component: SignupComponent },
  { path: "", redirectTo: "signup"},
  { path: "signup", component: SignupComponent },
  { path: "login", component: LoginComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class UserRoutingModule { }
