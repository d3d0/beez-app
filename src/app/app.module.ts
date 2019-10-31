import { NgModule, NO_ERRORS_SCHEMA, LOCALE_ID } from "@angular/core";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptAnimationsModule } from "nativescript-angular/animations";
import { ModalDialogService } from "nativescript-angular/modal-dialog";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AppComponent } from "./app.component";
import { AppRoutingModule, authProviders } from "./app.routing";
import { BackendService } from "./shared/backend.service";
import { TaxonomyService } from "./shared/taxonomy.service";
import { SharedModule } from "./shared/shared.module";

import { CardView } from "nativescript-cardview";
import { registerElement } from "nativescript-angular";

import { NativeScriptMaterialBottomNavigationBarModule} from "nativescript-material-bottomnavigationbar/angular";

registerElement("CardView", () => CardView);
registerElement("PreviousNextView", () => require("nativescript-iqkeyboardmanager").PreviousNextView);

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
        SharedModule,
        NativeScriptMaterialBottomNavigationBarModule
    ],
    declarations: [
        AppComponent,
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule {

 }
