import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";
import { AuthGuard } from "./auth-guard.service";
import { LoginComponent } from "./user/login/login.component";

export const authProviders = [
  AuthGuard
];

const routes: Routes = [
		{ path: "", redirectTo: "/(castingsTab:castings//notificationsTab:notifications//profileTab:profile)", pathMatch: "full" ,canActivate: [AuthGuard]},
    { path: "castings", loadChildren: "~/app/castings/castings.module#CastingsModule", outlet: "castingsTab",canActivate: [AuthGuard]},
    { path: "notifications", loadChildren: "~/app/notifications/notifications.module#NotificationsModule", outlet: "notificationsTab",canActivate: [AuthGuard]},
    { path: "profile", loadChildren: "~/app/profile/profile.module#ProfileModule", outlet: "profileTab",canActivate: [AuthGuard]}, 
    { path: "login", component: LoginComponent} 
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }