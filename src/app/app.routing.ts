import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";
import { AuthGuard } from "./auth-guard.service";

export const authProviders = [
  AuthGuard
];

const routes: Routes = [
		{ path: "", redirectTo: "/(castingsTab:castings//notificationsTab:notifications//profileTab:profile)", pathMatch: "full"},
    { path: "castings", loadChildren: "~/app/castings/castings.module#CastingsModule", outlet: "castingsTab",canActivate: [AuthGuard]},
    { path: "notifications", loadChildren: "~/app/notifications/notifications.module#NotificationsModule", outlet: "notificationsTab",canActivate: [AuthGuard]},
    { path: "profile", loadChildren: "~/app/profile/profile.module#ProfileModule", outlet: "profileTab",canActivate: [AuthGuard]}, 
    { path: "user", loadChildren: "~/app/user/user.module#UserModule"} 
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    // imports: [NativeScriptRouterModule.forRoot(routes, { enableTracing: true })],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }