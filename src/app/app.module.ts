import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { enable as traceEnable, addCategories } from "tns-core-modules/trace";

import { AppComponent } from "./app.component";
import { AppRoutingModule, authProviders } from "./app.routing";
import { setStatusBarColors, BackendService } from "./shared";

import { CastingsService} from "./castings/castings.service";
import { NotificationsService} from "./notifications/notifications.service";
import { UserService} from "./user/user.service";

// traceEnable();

@NgModule({
    bootstrap: [
        AppComponent
    ],
    providers: [
        authProviders,
        BackendService,
        NotificationsService,
        UserService,
        CastingsService
    ],
    imports: [
        AppRoutingModule,
        NativeScriptModule,
        NativeScriptHttpClientModule,
        NativeScriptRouterModule
    ],
    declarations: [
        AppComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule {

 }
