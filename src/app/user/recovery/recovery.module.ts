import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { SharedModule } from "../../shared/shared.module"
import { RecoveryComponent } from "./recovery.component";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    NativeScriptCommonModule,
    SharedModule,
    NativeScriptFormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    RecoveryComponent
],
  schemas: [NO_ERRORS_SCHEMA]
})
export class RecoveryModule { }
