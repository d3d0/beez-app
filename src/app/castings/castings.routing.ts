import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { CastingsListComponent } from "./castings-list/castings-list.component";
import { CastingsDetailComponent } from "./castings-detail/castings-detail.component";

export const routes: Routes = [
    { path: "",component: CastingsListComponent} 
    { path: ":id",component: CastingsDetailComponent} 
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],  // set the lazy loaded routes using forChild
    exports: [NativeScriptRouterModule]
})
export class CastingsRoutingModule { }