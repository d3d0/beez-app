import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { LoginComponent } from "./login/login.component";
import { CastingsComponent } from "./castings/castings.component";
import { CastingComponent } from "./castings/casting/casting.component";
import { MessagesComponent } from "./messages/messages.component";
import { ProfileComponent } from "./profile/profile.component";

export const COMPONENTS = [LoginComponent, CastingComponent, CastingsComponent, MessagesComponent, ProfileComponent];

const routes: Routes = [
    { path: "", redirectTo: "/(castingsTab:castings//messagesTab:messages//profileTab:profile)", pathMatch: "full" },

    // { path: "login", component: LoginComponent, outlet: "homeTab" },
    { path: "castings", component: CastingsComponent, outlet: "castingsTab" },
    { path: "messages", component: MessagesComponent, outlet: "messagesTab" },
    { path: "profile", component: ProfileComponent, outlet: "profileTab" },

    { path: "castings/:id", component: CastingComponent, outlet: "castingTab" }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
