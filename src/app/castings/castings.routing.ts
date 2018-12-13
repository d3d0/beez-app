import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { CastingsComponent } from "./castings.component";
import { CastingDetailComponent } from "./casting-detail/casting-detail.component";

export const routes: Routes = [
    { path: "", component: CastingsComponent },
    { path: ":id", component: CastingDetailComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],  // set the lazy loaded routes using forChild
    exports: [NativeScriptRouterModule]
})
export class CastingsRoutingModule { }