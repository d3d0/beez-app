import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptLocalizeModule } from "nativescript-localize/angular";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { NativeScriptRouterModule } from "nativescript-angular/router";
// import { AppRoutingModule, COMPONENTS } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { setStatusBarColors, BackendService, LoginService } from "./shared";
// import { CastingsModule } from "./castings/castings.module";
// import { NotificationsModule } from "./notifications/notifications.module";
// import { ProfileModule } from "./profile/profile.module";
import { AppRoutingModule } from "./app.routing";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        AppRoutingModule,
        NativeScriptModule,
        NativeScriptHttpClientModule,
        NativeScriptRouterModule,
        NativeScriptLocalizeModule
    ],
    declarations: [
        AppComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
