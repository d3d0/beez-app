import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptLocalizeModule } from "nativescript-localize/angular";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { AppComponent } from "./app.component";
import { AppRoutingModule, authProviders } from "./app.routing";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    providers: [
        authProviders
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
