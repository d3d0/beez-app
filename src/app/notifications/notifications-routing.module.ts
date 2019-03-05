import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { NotificationsListComponent } from "./notifications-list/notifications-list.component";
import { CastingDetailComponent } from "../castings/casting-detail/casting-detail.component"
const routes: Routes = [
    { path: "", component: NotificationsListComponent },
    { path: "castings:id", component: CastingDetailComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class NotificationsRoutingModule { }
