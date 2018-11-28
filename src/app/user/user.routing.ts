import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { ModuleWithProviders }  from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { LoginComponent } from "./login/login.component";
import { SigninComponent } from "./signin/signin.component";

const routes: Routes = [
	{ path: "user", redirectTo: "login", pathMatch: 'full' },
  { path: "signin", component: SigninComponent },
  { path: "login", component: LoginComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class UserRoutingModule { }
