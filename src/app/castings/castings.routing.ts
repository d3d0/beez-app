import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { CastingsComponent } from "./castings.component";
import { CastingDetailComponent } from "../castings/casting-detail/casting-detail.component";

export const routes: Routes = [
		{ path: "", redirectTo: "castings" },
    { path: "castings", component: CastingsComponent },
    { path: "casting/:id", component: CastingDetailComponent}
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})

export class CastingsRoutingModule { }