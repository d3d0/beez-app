import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptAnimationsModule } from "nativescript-angular/animations";
import { ModalDialogService } from "nativescript-angular/modal-dialog";
import { SharedModule } from './shared/shared.module';

import { AppComponent } from "./app.component";

import { AppRoutingModule, authProviders } from "./app.routing";
import { setStatusBarColors, BackendService } from "./shared";

// material card view
import { registerElement } from "nativescript-angular/element-registry";
import { CardView } from "nativescript-cardview";
registerElement("CardView", () => CardView);

@NgModule({
    bootstrap: [
        AppComponent
    ],
    providers: [
        authProviders,
        ModalDialogService,
        BackendService
    ],
    imports: [
        AppRoutingModule,
        NativeScriptModule,
        NativeScriptHttpClientModule,
        NativeScriptRouterModule,
        SharedModule
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
