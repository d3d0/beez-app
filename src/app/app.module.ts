import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { AppComponent } from "./app.component";
import { AppRoutingModule, authProviders } from "./app.routing";
import { UserModule } from "./user/user.module";
import { HomeComponent } from './home/home.component';

@NgModule({
    bootstrap: [
        AppComponent
    ],
    providers: [
        authProviders
    ],
    imports: [
        UserModule, 
        AppRoutingModule,
        NativeScriptModule,
        NativeScriptHttpClientModule,
        NativeScriptRouterModule
    ],
    declarations: [
        AppComponent,
        HomeComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
