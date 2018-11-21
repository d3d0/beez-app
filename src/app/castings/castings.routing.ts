import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { CastingsListComponent } from "./castings-list/castings-list.component";

export const routes: Routes = [
    {
        path: "",
        component: CastingsListComponent
    }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],  // set the lazy loaded routes using forChild
    exports: [NativeScriptRouterModule]
})
export class CastingsRoutingModule { }