import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { ModuleWithProviders }  from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { SelectDateModalViewComponent } from "../shared/select-date-modal-view/select-date-modal-view.component";

const routes: Routes = [
  { path: "", component: LoginComponent },
  // { path: "user", redirectTo: "login", pathMatch: 'full'},
  { path: "signup", component: SignupComponent },
  { path: "login", component: LoginComponent },
  { path: "date-model", component: SelectDateModalViewComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class UserRoutingModule { }
