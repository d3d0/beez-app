import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule, NSEmptyOutletComponent } from "nativescript-angular/router";
import { HomeComponent } from "./home.component";

const homeRoutes: Routes = [
    { path: "", redirectTo: "default" },
    { path: "default", component: HomeComponent , children: [
        { path: "castings", component: NSEmptyOutletComponent,  loadChildren: "~/app/castings/castings.module#CastingsModule", outlet: "castingsTab"},
        { path: "notifications", component: NSEmptyOutletComponent, loadChildren: "~/app/notifications/notifications.module#NotificationsModule", outlet: "notificationsTab"},
        { path: "profile", component: NSEmptyOutletComponent, loadChildren: "~/app/profile/profile.module#ProfileModule", outlet: "profileTab"}
    ]}
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(homeRoutes)],
    exports: [NativeScriptRouterModule]
})
export class HomeRoutingModule { }
