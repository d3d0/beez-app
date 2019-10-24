import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { SettingsComponent } from './settings/settings.component';
import { ProfileComponent } from "./profile.component";
import { PasswordComponent } from "./password/password.component"

const routes: Routes = [
    { path: "", redirectTo: "profile" },
    { path: "profile", component: ProfileComponent },
    { path: "settings", component:SettingsComponent},
    { path: "password", component:PasswordComponent}
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class ProfileRoutingModule {}
