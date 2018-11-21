import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

const routes: Routes = [
		{ path: "", redirectTo: "/(castingsTab:castings//notificationsTab:notifications//profileTab:profile)", pathMatch: "full" },
    { path: "castings", loadChildren: "~/app/castings/castings.module#CastingsModule", outlet: "castingsTab"},
    { path: "notifications", loadChildren: "~/app/notifications/notifications.module#NotificationsModule", outlet: "notificationsTab"},
    { path: "profile", loadChildren: "~/app/profile/profile.module#ProfileModule", outlet: "profileTab"} 
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }