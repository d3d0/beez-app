import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";
import { AuthGuard } from "./auth-guard.service";

export const authProviders = [
  AuthGuard
];

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: 'full' },
  { path: "home", loadChildren: "~/app/home/home.module#HomeModule", canActivate: [AuthGuard]},
  { path: "user", loadChildren: "~/app/user/user.module#UserModule" }
];

@NgModule({
	imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }