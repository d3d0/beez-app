import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";
import { AuthGuard } from "./auth-guard.service";
import { SettingsComponent } from './settings/settings.component';

export const authProviders = [
  AuthGuard
];

const routes: Routes = [
	{ path: "", redirectTo: "home", pathMatch: 'full' },

  { path: "home", loadChildren: "~/app/home/home.module#HomeModule"},
  // { path: "home", loadChildren: "~/app/home/home.module#HomeModule", canActivate: [AuthGuard]},

  { path: "user", loadChildren: "~/app/user/user.module#UserModule" }
];

@NgModule({
		imports: [NativeScriptRouterModule.forRoot(routes)],
    // imports: [NativeScriptRouterModule.forRoot(routes, { enableTracing: true })],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }